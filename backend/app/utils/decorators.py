from functools import wraps
from flask import request
from backend.app.services.auth_service import AuthService
from backend.app.utils.exceptions import UnauthorizedError

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            raise UnauthorizedError('Token is missing!')

        try:
            current_user = AuthService.get_user_from_token(token)
        except UnauthorizedError as e:
            raise UnauthorizedError(str(e))

        return f(current_user, *args, **kwargs)
    return decorated
