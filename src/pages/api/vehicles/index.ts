import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const vehicles = await prisma.vehicle.findMany({
        include: {
          listing: true,
        },
      });
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
  } else if (req.method === 'POST') {
    try {
      const { vehicle, listing } = req.body;

      if (!vehicle || !listing) {
        return res.status(400).json({ error: 'Missing vehicle or listing data' });
      }

      const newVehicle = await prisma.vehicle.create({
        data: {
          ...vehicle,
          listing: {
            create: {
              ...listing,
            },
          },
        },
      });

      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add vehicle and listing' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
