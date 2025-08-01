from flask import request
from flask_restx import Namespace, Resource, fields
from backend.app.utils.decorators import token_required
from backend.app.services.auth_service import AuthService

auth_ns = Namespace('auth', description='Authentication related operations')

user_model = auth_ns.model('User', {
    'id': fields.Integer(readOnly=True, description='The user unique identifier'),
    'email': fields.String(required=True, description='The user email address'),
    'created_at': fields.DateTime(readOnly=True, description='The timestamp when the user was created'),
    'updated_at': fields.DateTime(readOnly=True, description='The timestamp when the user was last updated')
})

user_register_parser = auth_ns.parser()
user_register_parser.add_argument('email', type=str, required=True, help='User email address')
user_register_parser.add_argument('password', type=str, required=True, help='User password')

user_login_parser = auth_ns.parser()
user_login_parser.add_argument('email', type=str, required=True, help='User email address')
user_login_parser.add_argument('password', type=str, required=True, help='User password')

@auth_ns.route('/register')
class UserRegister(Resource):
    @auth_ns.expect(user_register_parser, validate=True)
    @auth_ns.marshal_with(user_model, code=201)
    @auth_ns.doc(description='Register a new user')
    def post(self):
        data = user_register_parser.parse_args()
        user = AuthService.register_user(data['email'], data['password'])
        return user, 201

@auth_ns.route('/login')
class UserLogin(Resource):
    @auth_ns.expect(user_login_parser, validate=True)
    @auth_ns.doc(description='Log in a user and return JWT token')
    def post(self):
        data = user_login_parser.parse_args()
        token = AuthService.login_user(data['email'], data['password'])
        return {'access_token': token}, 200

@auth_ns.route('/logout')
class UserLogout(Resource):
    @auth_ns.doc(description='Log out a user (invalidate token)')
    @token_required
    def post(self):
        # For JWT, logout is typically client-side by discarding the token.
        # If server-side token blacklisting is implemented, it would go here.
        return {'message': 'Successfully logged out'}, 200

@auth_ns.route('/me')
class UserMe(Resource):
    @auth_ns.marshal_with(user_model)
    @auth_ns.doc(description='Get current user information')
    @token_required
    def get(self, current_user):
        return current_user, 200
