import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      const API_URL = process.env.API_BASE_URL;
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(201).json(data);
      } else {
        res.status(response.status).json({ message: data.message });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro na autenticação.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
