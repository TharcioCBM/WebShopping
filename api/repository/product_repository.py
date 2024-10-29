from model.product import Product
from repository.baseRepository import BaseRepository
from app import db
class ProductRepository(BaseRepository):
    
    def __init__(self):
        super().__init__(model=Product)
    
    def get_offer_page(self,limit,offset):
        return db.session.scalars(db.select(Product).order_by(Product.offer.desc()).limit(limit).offset(offset)).all()