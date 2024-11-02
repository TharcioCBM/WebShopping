import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const productId = req.query['x-product-id']

            const BASE_URL = process.env.API_BASE_URL;
            const url = productId ? `${BASE_URL}/product/${productId}` : `${BASE_URL}/product/offer`;
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
