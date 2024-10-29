from model.product import Product
from repository.product_repository import ProductRepository

product_repository = ProductRepository()

class ProductService:
    
    def __init__(self) -> None:
        pass


    def find_product_by_id(self,id):
        product = product_repository.get_by_id(id=id)
        if product:
            product = {
                'id': product.id,
                'name' : product.name,
                'description' : product.description,
                'price': product.price,
                'offer': product.offer,
                'specifications': [specifications.name for specifications in product.specifications],
                'images': [images.url for images in product.images],
                'categories':[categories.name for categories in product.categories]
            }
        return product
    
    def find_offer_products_page(self,limit,offset):
        product_list = product_repository.get_offer_page(limit=limit,offset=offset)
        products = []
        if product_list:
            for product in product_list:
                product_dic = {
                    'id': product.id,
                    'name' : product.name,
                    'description' : product.description,
                    'price': product.price,
                    'offer': product.offer,
                    'specifications': [specifications.name for specifications in product.specifications],
                    'images': [images.url for images in product.images],
                    'categories':[categories.name for categories in product.categories]
                }
                products.append(product_dic)
        pagination = {
            'page': offset+1 if product_list else None,
            'next_page': offset+2 if len(product_list) == limit else None,
            'previous_page': offset if offset > 0 else None
        }
        response = {
            'products': products,
            'pagination': pagination
        }
        return response
    
    