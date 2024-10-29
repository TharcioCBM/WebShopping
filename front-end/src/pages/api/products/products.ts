import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://127.0.0.1:8080/product/offer', {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido.' });
    }
}
