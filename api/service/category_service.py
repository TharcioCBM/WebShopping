from repository.category_repository import Category_Repository
from util.api_methods import paginate
category_repository = Category_Repository()

class Category_Service:
    
    def __init__(self) -> None:
        pass

    def find_all_categories(self):
        categories = category_repository.get_all()
        list_of_categories = []
        if categories:
            for category in categories:
                category_dic = {
                    'id': category.id,
                    'name' : category.name,
                    'description' : category.description,
                    'url_image' : category.url_image
                }
                list_of_categories.append(category_dic)
        return list_of_categories

    def find_page_products_in_category(self,id,limit,offset):
        category_products = category_repository.get_by_id(id)
        if category_products:
            list_of_products = []
            if len(category_products.products) > 0:
                for product in category_products.products:
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
                    list_of_products.append(product_dic)        
            page,pagination = paginate(list=list_of_products,limit=limit,offset=offset)
            response = {
                'pagination': pagination,
                'products': page
            }
            return response
        return 
            