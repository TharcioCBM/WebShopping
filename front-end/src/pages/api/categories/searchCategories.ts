import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const categoryId = req.headers['x-category-id'];
        try {
            const response = await fetch(`http://127.0.0.1:8080/categories/${categoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching products by category:', error); 
            res.status(500).json({ message: 'Erro ao buscar produtos por categorias.' });
        }
    }
}