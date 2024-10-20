import os

class DevelopmentConfig(object):
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False