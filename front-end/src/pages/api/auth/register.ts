import type { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;

      const API_URL = process.env.API_BASE_URL;
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data });
      } else {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.error_message });
      }
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
