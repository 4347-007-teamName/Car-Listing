import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sellerid } = req.query;

  if (!sellerid) {
    return res.status(400).json({ error: 'Seller ID is required' });
  }

  try {
    if (req.method === 'GET') {
      const financingInfo = await prisma.financinginfo.findUnique({
        where: { sellerid: parseInt(sellerid as string, 10) },
      });

      if (!financingInfo) {
        return res.status(404).json({ error: 'Financing info not found' });
      }

      return res.status(200).json(financingInfo);
    }

    if (req.method === 'PUT') {
      const { interestrate } = req.body;

      const updatedFinancingInfo = await prisma.financinginfo.update({
        where: { sellerid: parseInt(sellerid as string, 10) },
        data: { interestrate },
      });

      return res.status(200).json(updatedFinancingInfo);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
