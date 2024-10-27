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
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erro ao carregar os produtos', error));
  }, []);

  return (


    <div className="bg-[#F1F1F1] w-full flex flex-col items-center justify-center">
      <FeaturedBanner />
      <div className="bg-transparent container mx-auto pt-0 px-0 pb-8 min-h-screen w-full flex flex-col">
        <FeaturedProductsSection products={products} />
        <AdvertisingBanners />
        <OfertasSection />
        <CategoriesSection />
      </div>
    </div>
  );
};

export default Home;
