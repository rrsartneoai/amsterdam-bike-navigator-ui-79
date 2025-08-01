import pytest
from backend.app import create_app, db
from backend.app.models.user import User
from werkzeug.security import generate_password_hash

@pytest.fixture(scope='session')
def app():
    app = create_app()
    app.config.from_object('backend.app.config.TestingConfig')
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture(scope='function')
def client(app):
    return app.test_client()

@pytest.fixture(scope='function')
def init_database(app):
    with app.app_context():
        db.session.begin_nested() # Use nested transaction for rollback
        yield db
        db.session.rollback() # Rollback changes after each test

@pytest.fixture(scope='function')
def test_user(init_database):
    user = User(email='test@example.com')
    user.set_password('password123')
    init_database.session.add(user)
    init_database.session.commit()
    return user

@pytest.fixture(scope='function')
def auth_headers(client, test_user):
    # Log in the test user to get a token
    response = client.post('/auth/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    token = response.json['access_token']
    return {'Authorization': f'Bearer {token}'}
