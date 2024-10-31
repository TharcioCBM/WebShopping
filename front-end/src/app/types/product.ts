export interface Product {
    id: number;
    name: string;
    description: string;
    images: {
      id: number;
      url: string;
      name: string;
    }[];
    categories: string;
    price: number;
    offer: number;
    specifications: {
      product_id: number;
      name: string;
    }[];
  }
  