from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from decouple import config
from .config import config_by_name

db = SQLAlchemy()
api = Api(
    version='1.0',
    title='Document Analysis Platform API',
    description='API for managing documents, analyses, orders, and payments.',
    doc='/swagger/'
)

def create_app():
    app = Flask(__name__)
    app_settings = config('APP_SETTINGS', 'development')
    app.config.from_object(config_by_name[app_settings])

    db.init_app(app)
    api.init_app(app)

    from backend.app.api.auth import auth_ns
    from backend.app.api.orders import orders_ns
    from backend.app.api.documents import documents_ns
    from backend.app.api.analyses import analyses_ns
    from backend.app.api.payments import payments_ns

    api.add_namespace(auth_ns, path='/auth')
    api.add_namespace(orders_ns, path='/orders')
    api.add_namespace(documents_ns, path='/documents')
    api.add_namespace(analyses_ns, path='/analyses')
    api.add_namespace(payments_ns, path='/payments')

    # Register error handlers
    from backend.app.utils.exceptions import APIError
    @app.errorhandler(APIError)
    def handle_api_error(error):
        response = error.to_dict()
        return response, error.status_code

    return app

# The following lines are typically for running the app directly,
# but for a larger project, it's often run via a WSGI server (e.g., Gunicorn)
# or a Flask CLI command.
# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True)
