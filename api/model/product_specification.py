from app import db

class Product_Specification(db.Model):

    __tablename__ = "product_specifications"

    name = db.Column(db.String(50),nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product = db.relationship('Product',back_populates='specifications')

    def __init__(self,name,product_id):
        self.name = name
        self.product_id = product_id