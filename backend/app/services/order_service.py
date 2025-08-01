from backend.app import db
from backend.app.models.order import Order
from backend.app.models.user import User
from backend.app.utils.exceptions import NotFoundError, ForbiddenError, BadRequestError

class OrderService:
    @staticmethod
    def create_order(user_id):
        user = User.query.get(user_id)
        if not user:
            raise NotFoundError('User not found.')
        
        new_order = Order(user_id=user_id, status='pending')
        db.session.add(new_order)
        db.session.commit()
        return new_order

    @staticmethod
    def get_order_by_id(order_id, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to access this order.')
        return order

    @staticmethod
    def get_orders_by_user(user_id):
        orders = Order.query.filter_by(user_id=user_id).all()
        return orders

    @staticmethod
    def update_order_status(order_id, new_status, user_id):
        order = OrderService.get_order_by_id(order_id, user_id) # Reuses permission check
        
        valid_statuses = ['pending', 'processing', 'completed', 'cancelled']
        if new_status not in valid_statuses:
            raise BadRequestError(f'Invalid status: {new_status}. Valid statuses are: {", ".join(valid_statuses)}')

        order.status = new_status
        db.session.commit()
        return order
