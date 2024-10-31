"use client"
import { useEffect, useState } from 'react';
import OfertasSection from './common/OfertasSection';
import FeaturedBanner from './common/FeaturedBanner';
import CategoriesSection from './common/CategoryCard';
import FeaturedProductsSection from './common/FeaturedProductSection';
import AdvertisingBanners from './common/AdvertisingBanners';

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('api/products/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data.request_data.products);
          console.log(data);
        } else {
          console.error('Erro ao buscar produtos:', res.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (


    <div className="bg-[#F1F1F1] w-full flex flex-col items-center justify-center">
      <FeaturedBanner />
      <div className="bg-transparent container mx-auto pt-0 px-0 pb-8 min-h-screen w-full flex flex-col">
        <FeaturedProductsSection products={products} />
        <AdvertisingBanners />
        <OfertasSection products={products}  />
        <CategoriesSection />
      </div>
    </div>
  );
};

export default Home;
