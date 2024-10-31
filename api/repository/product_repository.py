from model.product import Product
from model.category import Category
from repository.baseRepository import BaseRepository
from app import db
class ProductRepository(BaseRepository):
    
    def __init__(self):
        super().__init__(model=Product)
    
    def get_offer_page(self,limit,offset):
        return db.session.scalars(db.select(Product).order_by(Product.offer.desc()).limit(limit).offset(offset)).all()
    
    def get_by_name(self,name):
        return db.session.scalars(db.select(Product).where(Product.name.ilike(f"%{name}%"))).all()

    def get_by_description(self,description):
        return db.session.scalars(db.select(Product).where(Product.description.ilike(f"%{description}%"))).all()
    
    def get_products_by_category_name(self,name):
        return db.session.scalars(db.select(Product).join(Category.products).where(Category.name.ilike(f"%{name}%"))).all()