import re

def validate_username(username):
    pattern,pattern2  = re.compile("[\W]+"),re.compile("[\w]{5,15}")
    if re.search(pattern=pattern,string=username):
        return "exitem caracteres inválidos no username fornecido"
    if not re.fullmatch(pattern=pattern2,string=username):
        return "O username deve ter 5 à 15 caracteres"


def validate_email(email):
    pattern =  re.compile('^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$')
    if not re.fullmatch(pattern=pattern,string=email):
        return "Padrão de e-mail inválido"

def validate_password(password):
    pattern = re.compile('[\s]+')
    pattern2 = re.compile('[a-z]+')
    pattern3 = re.compile('[A-Z]+')
    pattern4 = re.compile('[\W]+')
    pattern5 = re.compile('.{4,}')
    if re.search(pattern=pattern,string=password):
        return "Não pode existir espaços vazios na senha"
    if not re.search(pattern=pattern2,string=password) or not re.search(pattern=pattern3,string=password):
        return "A senha deve conter pelo menos uma letra maiuscula e uma minuscula" 
    if not re.search(pattern=pattern4,string=password):
        return "A senha deve conter pelo menos um símbolo"
    if not re.search(pattern=pattern5,string=password):
        return "A senha deve conter no mínimo 4 caracteres"

    