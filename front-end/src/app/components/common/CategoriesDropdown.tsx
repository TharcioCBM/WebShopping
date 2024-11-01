'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Category {
  id: number;
  description: string;
  url_image: string;
}

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/categories/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const data = await res.json()
          setCategories(data.request_data || [])
        } else {
          console.error('Erro ao buscar categorias:', res.statusText)
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Categorias <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {isLoading ? (
            <DropdownMenuItem disabled>Carregando...</DropdownMenuItem>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link href={`/searchResults?category=${category.id}&name=${encodeURIComponent(category.description)}`} className="w-full">
                  {category.description}
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>Nenhuma categoria encontrada</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}