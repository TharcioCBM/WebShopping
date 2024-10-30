from flask import Blueprint,request
from util.responses import error_response,success_response
from service.product_service import ProductService

product_bp = Blueprint('product_api',__name__,url_prefix='/product')
product_service = ProductService()

@product_bp.route("/<product_id>",methods=["GET"])
def product_methods(product_id):
    if not product_id.isnumeric():
        return error_response(action="GET Product",error_message="product/<id> Parameter id must be a number",error_code=400)
    product_id = int(product_id)
    if request.method == "GET":
        try:
            product = product_service.find_product_by_id(product_id)
            if product:
                return success_response(action="GET Product",parameter=product)
            else:
                return error_response(action="GET Product",error_message="Produto não encontrada ou não existe!",error_code=404)
        except Exception as err:
            return error_response(action="GET Product",error_message=str(err),error_code=500)
        
@product_bp.route("/offer",methods=["GET"])
def get_offer():
    limit = request.args.get('limit') if  "limit" in request.args and request.args.get('limit').isdigit() else 10
    offset = request.args.get('offset') if "offset" in request.args and request.args.get('offset').isdigit() else 1
    if int(limit) < 1 or int(offset) < 1:
        return error_response(action="GET offer page",error_message="limit and offset cannot be less than one",error_code=400)
    try:                 
        products = product_service.find_offer_products_page(limit=int(limit),offset=int(offset)-1)
        if products:
            return success_response(action="GET Product",parameter=products)
        else:
            return error_response(action="GET Product",error_message="Produto não encontrada ou não existe!",error_code=404)
    except Exception as err:
        return error_response(action="GET Product",error_message=str(err),error_code=500)
    
@product_bp.route("/s",methods=["GET"])
def product_search():
    limit = request.args.get('limit') if  "limit" in request.args and request.args.get('limit').isdigit() else 20
    offset = request.args.get('offset') if "offset" in request.args and request.args.get('offset').isdigit() else 1
    if int(limit) < 1 or int(offset) < 1:
        return error_response(action="GET product search",error_message="limit and offset cannot be less than one",error_code=400)
    if request.args:
        keyword = request.args.get('k')
        #TODO category = request.args.get('category')
        try:
            products_page = product_service.search_products(limit=limit,offset=offset,keyword=keyword)
            return success_response(action="GET Product",parameter=products_page)
        except Exception as err:
            return error_response(action="GET product search",error_message=str(err),error_code=500)
    else:
        return error_response(action="GET product search",error_message="no keywords were passed",error_code=400)