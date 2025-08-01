from flask_restx import Namespace, Resource, fields
from backend.app.utils.decorators import token_required
from backend.app.services.payment_service import PaymentService

payments_ns = Namespace('payments', description='Payment related operations')

payment_intent_model = payments_ns.model('PaymentIntent', {
    'client_secret': fields.String(required=True, description='Stripe client secret for the payment intent')
})

payment_confirm_parser = payments_ns.parser()
payment_confirm_parser.add_argument('payment_intent_id', type=str, required=True, help='Stripe Payment Intent ID')

@payments_ns.route('/orders/<int:order_id>/payment-intent')
class PaymentIntentResource(Resource):
    @payments_ns.marshal_with(payment_intent_model)
    @payments_ns.doc(description='Create a Stripe Payment Intent for an order')
    @token_required
    def post(self, current_user, order_id):
        # In a real app, the amount would be calculated based on the order details
        # For simplicity, we'll use a fixed amount or derive it from order
        amount = 1000 # Example amount in cents (e.g., $10.00)
        client_secret = PaymentService.create_payment_intent(order_id, amount, current_user.id)
        return {'client_secret': client_secret}, 201

@payments_ns.route('/orders/<int:order_id>/payment-confirm')
class PaymentConfirmResource(Resource):
    @payments_ns.expect(payment_confirm_parser, validate=True)
    @payments_ns.doc(description='Confirm a Stripe Payment Intent for an order')
    @token_required
    def post(self, current_user, order_id):
        data = payment_confirm_parser.parse_args()
        PaymentService.confirm_payment(order_id, data['payment_intent_id'], current_user.id)
        return {'message': 'Payment confirmed successfully'}, 200
