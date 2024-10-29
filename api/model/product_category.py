from app import db

product_categories = db.Table(

    "product_categories",
    db.Model.metadata,
    db.Column('product_id', db.ForeignKey("products.id"),primary_key=True),
    db.Column('category_id', db.ForeignKey("categories.id"),primary_key=True)

)
