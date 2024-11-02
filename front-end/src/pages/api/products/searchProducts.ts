import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const searchQuery = req.headers['x-search-query'];
        console.log(searchQuery)
        try {
            const API_URL = process.env.API_BASE_URL;
            const response = await fetch(`${API_URL}/product/s?k=${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                res.status(200).json(data);
                console.log(data);
            } else {
                res.status(response.status).json({ message: data.message });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido.' });
    }
}
