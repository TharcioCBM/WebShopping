import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    """Base configuration variables."""
    SECRET_KEY = os.getenv('SECRET_KEY') or 'this is a secret'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
<<<<<<< HEAD

=======
    JSON_SORT_KEYS=False
    
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
class DevelopmentConfig(Config):
    DEBUG = True