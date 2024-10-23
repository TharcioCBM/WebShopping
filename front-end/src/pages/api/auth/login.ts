// app/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (response.ok) {
        // Retorna o token JWT ou dados do usuário autenticado
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: data.message });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ message: 'Erro na autenticação.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
