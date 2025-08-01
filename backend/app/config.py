import os
from decouple import config

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = config('SECRET_KEY', 'a_very_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = config('JWT_SECRET_KEY', 'super_secret_jwt_key')
    # Add other common configurations here

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URL', 'postgresql://user:password@localhost:5432/dev_db')
    # AWS S3
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID', None)
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY', None)
    AWS_REGION = config('AWS_REGION', 'us-east-1')
    S3_BUCKET_NAME = config('S3_BUCKET_NAME', 'document-analysis-dev-bucket')
    # Stripe
    STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY', 'sk_test_your_stripe_secret_key')
    STRIPE_PUBLIC_KEY = config('STRIPE_PUBLIC_KEY', 'pk_test_your_stripe_public_key')

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = config('TEST_DATABASE_URL', 'postgresql://user:password@localhost:5432/test_db')
    JWT_SECRET_KEY = 'test_jwt_secret_key' # Override for testing

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URL', 'postgresql://user:password@localhost:5432/prod_db')
    # Add production specific configurations here
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID', None)
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY', None)
    AWS_REGION = config('AWS_REGION', 'us-east-1')
    S3_BUCKET_NAME = config('S3_BUCKET_NAME', 'document-analysis-prod-bucket')
    STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY', 'sk_prod_your_stripe_secret_key')
    STRIPE_PUBLIC_KEY = config('STRIPE_PUBLIC_KEY', 'pk_prod_your_stripe_public_key')

config_by_name = dict(
    development=DevelopmentConfig,
    testing=TestingConfig,
    production=ProductionConfig,
    default=DevelopmentConfig
)
