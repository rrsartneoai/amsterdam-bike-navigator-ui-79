import stripe
from flask import current_app
from backend.app import db
from backend.app.models.order import Order
from backend.app.models.payment import Payment
from backend.app.utils.exceptions import NotFoundError, ForbiddenError, BadRequestError, ConflictError

class PaymentService:
    @staticmethod
    def create_payment_intent(order_id, amount, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to create a payment for this order.')
        
        # Check if a payment intent already exists for this order
        existing_payment = Payment.query.filter_by(order_id=order_id, status='pending').first()
        if existing_payment:
            # Optionally, retrieve and return the existing client secret
            # Or update the existing payment intent if amount changes
            raise ConflictError('A pending payment intent already exists for this order.')

        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']

        try:
            intent = stripe.PaymentIntent.create(
                amount=amount, # amount in cents
                currency='usd',
                metadata={'order_id': order_id, 'user_id': user_id},
            )
            
            new_payment = Payment(
                order_id=order.id,
                stripe_payment_intent_id=intent.id,
                amount=amount / 100.0, # Store in dollars
                currency='usd',
                status='pending'
            )
            db.session.add(new_payment)
            db.session.commit()

            return intent.client_secret
        except stripe.error.StripeError as e:
            raise BadRequestError(f'Stripe error: {str(e)}')

    @staticmethod
    def confirm_payment(order_id, payment_intent_id, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to confirm payment for this order.')

        payment = Payment.query.filter_by(order_id=order_id, stripe_payment_intent_id=payment_intent_id).first()
        if not payment:
            raise NotFoundError('Payment intent not found for this order.')
        
        if payment.status == 'succeeded':
            raise ConflictError('Payment has already been confirmed.')

        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']

        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            if intent.status == 'succeeded':
                payment.status = 'succeeded'
                order.status = 'paid' # Update order status after successful payment
                db.session.commit()
                return True
            else:
                # Handle other statuses like 'requires_action', 'requires_payment_method', etc.
                payment.status = intent.status # Update payment status based on Stripe
                db.session.commit()
                raise BadRequestError(f'Payment intent status: {intent.status}. Payment not succeeded.')
        except stripe.error.StripeError as e:
            raise BadRequestError(f'Stripe error: {str(e)}')
