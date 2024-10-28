<<<<<<< HEAD
// app/api/auth/login.ts
=======
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
<<<<<<< HEAD
      const response = await fetch('http://127.0.0.1:5000/login', {
=======
      const { username, password } = req.body;

      const response = await fetch('http://127.0.0.1:8080/users/login', {
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify(req.body),
=======
        body: JSON.stringify({ username,password }),
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
      });

      const data = await response.json();

      if (response.ok) {
<<<<<<< HEAD
        // Retorna o token JWT ou dados do usuário autenticado
        res.status(200).json(data);
=======
        res.status(201).json(data);
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
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
