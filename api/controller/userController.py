from flask import Blueprint,request,make_response
from util.responses import error_response,success_response
from service.userService import UserService
from util.validation_methods import validate_email,validate_password,validate_username
user_bp = Blueprint('users_api',__name__,url_prefix='/users')
userService = UserService()

@user_bp.route("",methods=["POST"])
def register():
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if len(data) < 3:
                return make_response(error_response(action="Register",error_code=400,error_message="missing one or more parameters"))
            elif "username" not in data or "email" not in data or "password" not in data:
                return make_response(error_response(action="Register",error_code=400,error_message="request body must contains 'username', 'email' and 'password'"))
            else:
                username = data.get("username")
                email = data.get("email")
                password = data.get("password")              
                try:
                    validate_username(username)
                    validate_password(password)
                    validate_email(email)
                    userService.validate_new_username(username=username)
                    userService.validate_new_email(email=email)     
                    userService.add_new_user(username=username,email=email,password=password)
                    return make_response(success_response(action="Register",code=201))           
                except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Register",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Register",error_message=str(err),error_code=500))
        else:                                                                            
            return make_response(error_response(action="Register",error_message="missing request body",error_code=400))                                             
