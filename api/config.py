import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    """Base configuration variables."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'a_default_secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True