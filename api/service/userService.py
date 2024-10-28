from model.user import User
from repository.userRepository import UserRepository
from app import bcrypt


userRepository = UserRepository()
class UserService:
    
    def __init__(self) -> None:
        pass
    
    
    def add_new_user(self,username,email,password):
        user = User(username=None,email=None,password=None)
        user.username = username         
        user.email = email         
        user.password =  bcrypt.generate_password_hash(password).decode("utf-8")         
        userRepository.save(user)   
        return

    
    def find_user_by_id(self,id):
        user = userRepository.get_by_id(id=id)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        return user
    
    def find_user_by_username(self,username):
        user = userRepository.get_by_username(username=username)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        return user
    
    def find_user_by_email(self,email):
        user = userRepository.get_by_email(email=email)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        return user


    def is_username_registered(self,username):
        if userRepository.get_by_username(username=username):
            return True
        return False
            
        

    def is_email_registered(self,email):
        if userRepository.get_by_email(email=email):
            return True
        return False
            

    #TODO:adicionar funcionalidade de pedir a senha
    def update_username(self,user_id,username):
        user = userRepository.get_by_id(user_id)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        user.username = username
        userRepository.update(user)
        return user
    
    #TODO:adicionar funcionalidade de pedir a senha 
    def update_email(self,user_id,email):
        user = userRepository.get_by_id(user_id)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        user.email = email
        userRepository.update(user)
        return user
    
    #TODO:adicionar funcionalidade de pedir a senha anterior
    def update_password(self,user_id,password):
        user = userRepository.get_by_id(user_id)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        user.password =  bcrypt.generate_password_hash(password).decode("utf-8")
        userRepository.update(user)
        return user
    
    def authenticate_user(self,username,password):
        user = userRepository.get_by_username(username=username)
        if user == None:
            return 
        if not bcrypt.check_password_hash(user.password, password):
            return 
        user = {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
        return user


