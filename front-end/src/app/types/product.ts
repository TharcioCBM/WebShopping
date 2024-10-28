// types/product.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    images: {
      id: number;
      url: string;
      name: string;
    }[];
    category: string;
    price: number;
    old_price: number;
    discount: number;
    shipping: string;
    rating: number;
    specifications: {
      network?: string;
      screen: string;
      rear_camera?: string;
      front_camera?: string;
      battery?: string;
      memory: string;
      color: string;
      processor?: string;
      graphics?: string;
    };
  }
  