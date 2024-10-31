import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://127.0.0.1:8080/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                res.status(200).json(data);
                //console.log(data);
            } else {
                res.status(response.status).json({ message: data.message });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar categorias.' });
        }
    } else {
        res.status(404).json({ message: 'Nenhuma categoria.' });
    }
}

