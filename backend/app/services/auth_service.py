import jwt
from datetime import datetime, timedelta
from flask import current_app
from backend.app import db
from backend.app.models.user import User
from backend.app.utils.exceptions import BadRequestError, UnauthorizedError

class AuthService:
    @staticmethod
    def register_user(email, password):
        if User.query.filter_by(email=email).first():
            raise BadRequestError('User with this email already exists.')

        new_user = User(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            raise UnauthorizedError('Invalid credentials.')

        token = jwt.encode(
            {
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(hours=24) # Token expires in 24 hours
            },
            current_app.config['JWT_SECRET_KEY'],
            algorithm='HS256'
        )
        return token

    @staticmethod
    def get_user_from_token(token):
        try:
            data = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            user_id = data['user_id']
            user = User.query.get(user_id)
            if not user:
                raise UnauthorizedError('User not found.')
            return user
        except jwt.ExpiredSignatureError:
            raise UnauthorizedError('Token has expired.')
        except jwt.InvalidTokenError:
            raise UnauthorizedError('Invalid token.')
