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
      const buyer = await prisma.buyer.findUnique({
        where: { userid: parseInt(userid as string, 10) },
      });

      if (!buyer) {
        return res.status(404).json({ error: 'Buyer not found' });
      }

      return res.status(200).json(buyer);
    }

    if (req.method === 'PUT') {
      const { numofpurchase, buyerrating } = req.body;

      const updatedBuyer = await prisma.buyer.update({
        where: { userid: parseInt(userid as string, 10) },
        data: { numofpurchase, buyerrating },
      });

      return res.status(200).json(updatedBuyer);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
