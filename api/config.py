import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    """Base configuration variables."""
    SECRET_KEY = os.getenv('SECRET_KEY') or 'this is a secret'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS=False
    
class DevelopmentConfig(Config):
    DEBUG = True