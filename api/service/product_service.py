from repository.product_repository import ProductRepository
from util.api_methods import paginate
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
        return 
    
    def find_offer_products_page(self,limit,offset):
        product_list = product_repository.get_offer_page(limit=limit,offset=offset)
        products = []
        if product_list:
            for product in product_list:
                if product.offer > 0:
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
    
    def search_products(self,limit,offset,keyword):
        response_list = []
        response = {
            'products': response_list,
            'pagination': []
        }
        product_by_name = product_repository.get_by_name(keyword)
        product_by_description = product_repository.get_by_description(keyword)
        product_by_category = product_repository.get_products_by_category_name(keyword)
        print(product_by_category)
        product_list = []
        product_list = list(set(product_by_name + product_by_description + product_by_category))

        if not product_list:
            return response
        
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
            response_list.append(product_dic)

        page,pagination = paginate(limit=limit,offset=offset,list=response_list)
        response = {
            'pagination': pagination,
            'products': page
        }
        return response
