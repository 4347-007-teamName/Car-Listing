import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { userid: parseInt(userid as string, 10) },
        include: { buyer: true, seller: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    }

    if (req.method === 'PUT') {
      const { username, firstname, middleinit, lastname } = req.body;

      const updatedUser = await prisma.user.update({
        where: { userid: parseInt(userid as string, 10) },
        data: { username, firstname, middleinit, lastname },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
