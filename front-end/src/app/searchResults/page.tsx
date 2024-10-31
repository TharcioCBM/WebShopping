"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

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

    console.log(categoryName)

    useEffect(() => {
        const fetchProducts = async () => {

            if(categoryId){
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
                        console.log(data);
                    } else {
                        console.error('Erro ao buscar produtos:', res.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
            
            else if (searchQuery) {
                try {
                    console.log(searchQuery)
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
                        console.log(data);
                    } else {
                        console.error('Erro ao buscar produtos:', res.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
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

    return (
        <div className="h-full">
            <div className="container bg-transparent mx-auto px-4 py-8">
                <div className="bg-sky-950  p-8">
                    <h1 className="text-2xl text-white font-normal">
                        Pesquisa por: <span className="text-slate-100 font-semibold">{categoryName || searchQuery}</span>
                    </h1>
                </div>

                <div className="bg-transparent p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {productsData.map((product) => (
                            <Link className='max-w-[300px]' href={`/product/${product.id}`} key={product.id}>
                                <Card className="rounded-lg hover:shadow-lg transition-shadow duration-200 w-full max-w-sm">
                                    <CardContent className="p-4">
                                        <div className="aspect-square relative mb-4">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <h2 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h2>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500 line-through">
                                                R$ {product.price.toFixed(2)}
                                            </p>
                                            <p className="text-lg font-bold text-gray-900">
                                                R$ {(product.price * (1 - (product.offer / 100))).toFixed(2)}
                                            </p>
                                            <p className="text-sm font-medium text-green-600">
                                                {product.offer}% OFF
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/search/all"
                            className="inline-block px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Ver todos os resultados
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}