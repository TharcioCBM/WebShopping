"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
    id: string
    name: string
    images: string
    price: number
    offer: number
    description: string;
}


export default function SearchResults() {

    const searchParams = useSearchParams()
    const categoryName = searchParams?.get('name')
    const categoryId = searchParams?.get('category') ?? ''
    const searchQuery = searchParams?.get('q')
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);

            if (categoryId) {
                try {
                    const res = await fetch('/api/categories/searchCategories', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Category-Id': categoryId || '',
                        },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setProductsData(data.request_data.products);
                    } else {
                        console.error('Erro ao buscar produtos:', res.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }

            else if (searchQuery) {
                try {

                    const res = await fetch('/api/products/searchProducts', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Search-Query': searchQuery || '',
                        },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setProductsData(data.request_data.products);

                    } else {
                        console.error('Erro ao buscar produtos:', res.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (categoryId) {
            fetchProducts();
        }
        else if (searchQuery) {
            fetchProducts();
        }
        
    }, [categoryId, searchQuery]);

    const maxProductsToShow = 12;

    if (isLoading) {
        return (
            <div className="w-full h-full">
                <div className="w-full bg-transparent p-0">
                    <div className="bg-sky-950 p-8">
                        <button
                            onClick={() => window.history.go(-1)}
                            className="text-white underline mb-2"
                        >
                            Voltar
                        </button>
                        <h1 className="text-2xl text-white font-normal">
                            Pesquisa por: <span className="text-slate-100 font-semibold">{categoryName || searchQuery}</span>
                        </h1>
                    </div>
    
                    <div className="bg-transparent p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <Card className="rounded-lg w-full max-w-[250px] h-full animate-pulse" key={index}>
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="aspect-square bg-gray-300 w-full mb-4 rounded-lg" />
                                        <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded" />
                                        <div className="h-3 bg-gray-300 w-full mb-2 rounded" />
                                        <div className="h-3 bg-gray-300 w-1/2 rounded" />
                                        <div className="flex flex-col mt-4">
                                            <div className="h-3 bg-gray-300 w-1/3 mb-1 rounded" />
                                            <div className="h-3 bg-gray-300 w-1/4 rounded" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

    if (!productsData || Object.keys(productsData).length === 0) {
        return (
          <div className="container mx-auto px-4 py-8">
            <Link href="#" onClick={() => window.history.go(-1)} className="flex items-center text-blue-600 hover:underline mb-6">
              <ChevronLeft size={20} />
              <span>Voltar</span>
            </Link>
            
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Produto não encontrado</h2>
                <p className="text-gray-600">
                  Desculpe, não conseguimos encontrar o produto que você está procurando.
                </p>
                <Button 
                  onClick={() => window.history.go(-1)}
                  className="bg-[#333137] hover:bg-[#333137]/90 text-white px-6"
                >
                  Continuar Comprando
                </Button>
              </div>
            </Card>
          </div>
        );
      }

    return (
        
        <div className="w-full h-full">
            <div className="w-full bg-transparent p-0">
                <div className="bg-sky-950  p-8">
                    <button
                        onClick={() => window.history.go(-1)}
                        className="text-white underline mb-2"
                    >
                        Voltar
                    </button>
                    <h1 className="text-2xl text-white font-normal">
                        Pesquisa por: <span className="text-slate-100 font-semibold">{categoryName || searchQuery}</span>
                    </h1>
                </div>

                <div className="bg-transparent p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-items-center">
                        {productsData.map((product) => (
                            <Link className='w-full max-w-[250px] h-full' href={`/ProductDetail/?id=${product.id}`} key={product.id}>
                                <Card className="rounded-lg hover:shadow-lg transition-shadow duration-200 w-full max-w-sm">
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="aspect-square relative mb-4 w-full">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <h2 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                                            {product.name}
                                        </h2>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[32px]">{product.description}</p>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 line-through">
                                                R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-bold">
                                                    R$ {(product.price * (1 - product.offer / 100)).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                                <span className="text-xs font-semibold text-green-600">
                                                    {product.offer}% OFF
                                                </span>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {productsData.length > maxProductsToShow && (
                        <div className="mt-8 text-center">
                            <Link
                                href="/search/all"
                                className="inline-block px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Ver todos os resultados
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}