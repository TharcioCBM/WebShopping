from app import db
from model.product_image import Product_Image
from model.product_specification import Product_Specification
from model.category import Category
from model.product_category import product_categories
class Product(db.Model):

    __tablename__ = "products"
 
    name = db.Column(db.String(50),nullable=False)
    description = db.Column(db.String(), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    offer = db.Column(db.Float(), nullable=False)
    specifications = db.relationship('Product_Specification',back_populates='product')
    images = db.relationship('Product_Image',back_populates='product')
    categories = db.relationship('Category', secondary=product_categories,back_populates='products')

    def __init__(self,name,description,price,offer=None):
        self.name = name
        self.description = description
        self.price = price
        self.offer = 0.0 if offer == None else offer
