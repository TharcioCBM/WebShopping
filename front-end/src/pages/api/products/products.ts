import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const productId = req.query['x-product-id']

            const url = productId 
                ? `http://127.0.0.1:8080/product/${productId}`
                : 'http://127.0.0.1:8080/product/offer';

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                res.status(200).json(data);
            } else {
                res.status(response.status).json({ message: data.message });
            }
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido.' });
    }
}
