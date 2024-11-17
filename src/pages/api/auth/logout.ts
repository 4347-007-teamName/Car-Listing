import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'isAdmin=; Path=/; HttpOnly; Max-Age=0');
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ error: 'Method not allowed' });
}
