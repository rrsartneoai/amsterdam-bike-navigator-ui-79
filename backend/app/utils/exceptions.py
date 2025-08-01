class APIError(Exception):
    status_code = 500
    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

class BadRequestError(APIError):
    status_code = 400

class UnauthorizedError(APIError):
    status_code = 401

class ForbiddenError(APIError):
    status_code = 403

class NotFoundError(APIError):
    status_code = 404

class ConflictError(APIError):
    status_code = 409
