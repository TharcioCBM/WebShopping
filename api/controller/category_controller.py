from flask import Blueprint,request
from util.responses import error_response,success_response
from service.category_service import Category_Service

category_bp = Blueprint('category_api',__name__,url_prefix='/categories')
category_service = Category_Service()

@category_bp.route("/<category_id>",methods=["GET"])
def category_methods(category_id):
    if not category_id.isdigit():
        return error_response(action="GET Product",error_message="category_id/<id> Parameter id must be a number",error_code=400)
    category_id = int(category_id)
    if request.method == "GET":
        limit = request.args.get('limit') if  "limit" in request.args and request.args.get('limit').isdigit() else 20
        offset = request.args.get('offset') if "offset" in request.args and request.args.get('offset').isdigit() else 1
        if int(limit) < 1 or int(offset) < 1:
            return error_response(action="GET offer page",error_message="limit and offset cannot be less than one",error_code=400)
        try:
            category_products = category_service.find_page_products_in_category(category_id,limit=int(limit),offset=int(offset))
            if category_products:
                return success_response(action="GET category products",parameter=category_products)
            else:
                return error_response(action="GET category products",error_message="Categoria não encontrada ou não existe!",error_code=404)
        except Exception as err:
            return error_response(action="GET category products",error_message=str(err),error_code=500)

@category_bp.route("",methods=["GET"])
def get_all_categories():
    if request.method == "GET":
        try:
            categories = category_service.find_all_categories()
            if categories:
                return success_response(action="GET category",parameter=categories)
            else:
                return error_response(action="GET category",error_message="Nenhuma Categoria Cadastrada!",error_code=404)
        except Exception as err:
            return error_response(action="GET category",error_message=str(err),error_code=500)