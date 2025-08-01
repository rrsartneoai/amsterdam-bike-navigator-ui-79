from flask import request
from flask_restx import Namespace, Resource, fields
from backend.app.utils.decorators import token_required
from backend.app.services.order_service import OrderService
from backend.app.services.document_service import DocumentService
from werkzeug.datastructures import FileStorage

orders_ns = Namespace('orders', description='Order related operations')

order_model = orders_ns.model('Order', {
    'id': fields.Integer(readOnly=True, description='The order unique identifier'),
    'user_id': fields.Integer(readOnly=True, description='The ID of the user who created the order'),
    'status': fields.String(required=True, description='The current status of the order'),
    'created_at': fields.DateTime(readOnly=True, description='The timestamp when the order was created'),
    'updated_at': fields.DateTime(readOnly=True, description='The timestamp when the order was last updated')
})

order_create_parser = orders_ns.parser()
order_create_parser.add_argument('user_id', type=int, required=True, help='User ID for the order') # In a real app, this would be derived from token

order_status_update_parser = orders_ns.parser()
order_status_update_parser.add_argument('status', type=str, required=True, help='New status for the order')

document_upload_parser = orders_ns.parser()
document_upload_parser.add_argument('file', type=FileStorage, location='files', required=True, help='Document file to upload')

@orders_ns.route('/')
class OrderList(Resource):
    @orders_ns.marshal_list_with(order_model)
    @orders_ns.doc(description='Get all orders for the current user')
    @token_required
    def get(self, current_user):
        orders = OrderService.get_orders_by_user(current_user.id)
        return orders

    @orders_ns.expect(order_create_parser, validate=True)
    @orders_ns.marshal_with(order_model, code=201)
    @orders_ns.doc(description='Create a new order')
    @token_required
    def post(self, current_user):
        # In a real app, user_id would be current_user.id, not from parser
        # For now, we'll use parser for simplicity in testing
        data = order_create_parser.parse_args()
        order = OrderService.create_order(current_user.id) # Use current_user.id
        return order, 201

@orders_ns.route('/<int:order_id>')
class Order(Resource):
    @orders_ns.marshal_with(order_model)
    @orders_ns.doc(description='Get order by ID')
    @token_required
    def get(self, current_user, order_id):
        order = OrderService.get_order_by_id(order_id, current_user.id)
        return order

@orders_ns.route('/<int:order_id>/status')
class OrderStatus(Resource):
    @orders_ns.expect(order_status_update_parser, validate=True)
    @orders_ns.marshal_with(order_model)
    @orders_ns.doc(description='Update order status')
    @token_required
    def put(self, current_user, order_id):
        data = order_status_update_parser.parse_args()
        order = OrderService.update_order_status(order_id, data['status'], current_user.id)
        return order

@orders_ns.route('/<int:order_id>/documents')
class OrderDocumentUpload(Resource):
    @orders_ns.expect(document_upload_parser, validate=True)
    @orders_ns.doc(description='Upload a document to an order')
    @token_required
    def post(self, current_user, order_id):
        uploaded_file = request.files['file']
        document = DocumentService.upload_document_for_order(order_id, uploaded_file, current_user.id)
        return {'message': 'Document uploaded successfully', 'document_id': document.id}, 201
