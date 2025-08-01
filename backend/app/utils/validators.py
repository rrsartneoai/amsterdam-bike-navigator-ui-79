import re
from backend.app.utils.exceptions import BadRequestError

class Validators:
    @staticmethod
    def validate_email(email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise BadRequestError("Invalid email format.")
        return True

    @staticmethod
    def validate_password_strength(password):
        if len(password) < 8:
            raise BadRequestError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", password):
            raise BadRequestError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", password):
            raise BadRequestError("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", password):
            raise BadRequestError("Password must contain at least one digit.")
        if not re.search(r"[!@#$%^&*(),.?"':{}|<>]", password):
            raise BadRequestError("Password must contain at least one special character.")
        return True

    @staticmethod
    def validate_order_status(status):
        valid_statuses = ['pending', 'processing', 'completed', 'cancelled', 'paid']
        if status not in valid_statuses:
            raise BadRequestError(f"Invalid order status. Must be one of: {', '.join(valid_statuses)}")
        return True

    @staticmethod
    def validate_file_extension(filename, allowed_extensions):
        if '.' not in filename:
            raise BadRequestError("File has no extension.")
        ext = filename.rsplit('.', 1)[1].lower()
        if ext not in allowed_extensions:
            raise BadRequestError(f"File type .{ext} not allowed. Allowed types: {', '.join(allowed_extensions)}")
        return True
