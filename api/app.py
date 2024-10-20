import os
from flask import Flask
from config import DevelopmentConfig
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import DateTime, Column, Integer
from sqlalchemy.sql import func
from flask_migrate import Migrate

class BaseModel(DeclarativeBase):
    id = Column(Integer, primary_key=True,autoincrement=True)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

db = SQLAlchemy(model_class=BaseModel)
bcrypt = Bcrypt()
migrate = Migrate()

def create_app():

    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    from controller.userController import user_bp
    app.register_blueprint(user_bp)
    return app