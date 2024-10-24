import type { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;

      const response = await fetch('http://127.0.0.1:8080/users', {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
