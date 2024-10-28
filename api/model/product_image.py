from app import db

class Product_Image(db.Model):

    __tablename__ = "product_images"

    url = db.Column(db.String(),nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product = db.relationship('Product',back_populates='images')

    def __init__(self,url,product_id):
        self.url = url
        self.product_id = product_id