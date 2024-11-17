import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      res.setHeader('Set-Cookie', 'isAdmin=true; Path=/; HttpOnly; Max-Age=3600');
      return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ error: 'Method not allowed' });
}
