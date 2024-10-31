from flask import Blueprint,request,current_app
from util.responses import error_response,success_response
from service.user_service import UserService
from util.validation_methods import validate_email,validate_password,validate_username
import jwt

user_bp = Blueprint('users_api',__name__,url_prefix='/users')
userService = UserService()

@user_bp.route("",methods=["POST"])
def register():
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if len(data) < 3:
                return error_response(action="Register",error_code=400,error_message="missing one or more parameters")
            elif "username" not in data or "email" not in data or "password" not in data:
                return error_response(action="Register",error_code=400,error_message="request body must contains 'username', 'email' and 'password'")
            else:
                username = data.get("username")
                email = data.get("email")
                password = data.get("password")              
                try:
                    validate_response = validate_username(username)
                    if validate_response:
                        return error_response(action="Register",error_message=validate_response,error_code=400)
                    validate_response = validate_email(email)
                    if validate_response:
                        return error_response(action="Register",error_message=validate_response,error_code=400)
                    validate_response = validate_password(password)
                    if validate_response:
                        return error_response(action="Register",error_message=validate_response,error_code=400)
                    if userService.is_username_registered(username=username):
                        return error_response(action="Register",error_message="Esse username já foi cadastrado",error_code=409)
                    if userService.is_email_registered(email=email):
                        return error_response(action="Register",error_message="Esse e-mail já foi cadastrado",error_code=409)
                    userService.add_new_user(username=username,email=email,password=password)
                    return success_response(action="Register",code=201)          
                except Exception as err:
                    return error_response(action="Register",error_message=str(err),error_code=500)
        else:                                                                            
            return error_response(action="Register",error_message="missing request body",error_code=400)                                           

@user_bp.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        if request.is_json:
            data = request.json
            if len(data) < 2:
                return error_response(action="Authenticate",error_code=400,error_message="missing one or more parameters")
            elif "username" not in data or "password" not in data:
                return error_response(action="Authenticate",error_code=400,error_message="request body must contains 'username' and 'password'")
            username = data.get("username")
            password = data.get("password")
            try:
                user = userService.authenticate_user(username=username,password=password)
                if user:
                    token = jwt.encode({"id": user["id"]},current_app.config["SECRET_KEY"],algorithm="HS256")
                    user.pop("id")
                    return  success_response(action="Authenticate",token=token, parameter=user)
                else:
                    return error_response(action="Authenticate",error_code=401,error_message="Usuário e/ou senha inválidos")
            except Exception as err:
                return error_response(action="Authenticate",error_code=500,error_message=err.args)
        else:
            return error_response(action="Authenticate",error_code=400,error_message="missing request body")
