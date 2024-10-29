from model.category import Category
from repository.baseRepository import BaseRepository

class Category_Repository(BaseRepository):
    
    def __init__(self):
        super().__init__(model=Category)