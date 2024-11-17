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
      const seller = await prisma.seller.findUnique({
        where: { userid: parseInt(userid as string, 10) },
        include: { financinginfo: true },
      });

      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }

      return res.status(200).json(seller);
    }

    if (req.method === 'PUT') {
      const { numofsale, sellerrating, financingoffered } = req.body;

      const updatedSeller = await prisma.seller.update({
        where: { userid: parseInt(userid as string, 10) },
        data: { numofsale, sellerrating, financingoffered },
      });

      return res.status(200).json(updatedSeller);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
