from app import db
from model.product_category import product_categories

class Category(db.Model):

    __tablename__ = "categories"

    name = db.Column(db.String(50),nullable=False)
    description = db.Column(db.String(), nullable=False)
    products = db.relationship('Product', secondary=product_categories,back_populates='categories')

    def __init__(self,name,description):
        self.name = name
        self.description = description