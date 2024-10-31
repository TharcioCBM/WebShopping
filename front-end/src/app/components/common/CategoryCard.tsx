import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: number;
  description: string;
  url_image: string;
}

interface CategoryCardProps {
  id: number;
  description: string;
  url_image: string;
}

export function CategoryCard({ id, description, url_image }: CategoryCardProps) {
  return (
    <Link href={`/searchResults?category=${id}&name=${description}`}>
      <Card className="rounded border hover:shadow-md transition-shadow duration-200">
        <CardContent className="flex items-center p-4 space-x-4">
          <Image src={url_image} alt={description} width={40} height={40} className="flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">{description}</span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/categories/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCategories(data.request_data || []);
        } else {
          console.error('Erro ao buscar categorias:', res.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="rounded-lg py-5 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="rounded border shadow-lg p-4 animate-pulse">
                <CardContent className="flex items-center p-4 space-x-4">
                  <div className="w-10 h-8 bg-gray-300 rounded-full"></div> 
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div> 
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            categories.map((category) => (
              <CategoryCard key={category.id} id={category.id} description={category.description} url_image={category.url_image} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
