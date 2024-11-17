import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vinnum } = req.query;

  try {
    if (req.method === 'GET') {
      const vehicle = await prisma.vehicle.findUnique({
        where: { vinnum: vinnum as string },
      });
      return res.status(vehicle ? 200 : 404).json(vehicle || { error: 'Vehicle not found' });
    }

    if (req.method === 'POST') {
      const { vinnum, year, make, model, trim_lvl, mileage, color, type } = req.body;
      const newVehicle = await prisma.vehicle.create({
        data: { vinnum, year, make, model, trim_lvl, mileage, color, type },
      });
      return res.status(201).json(newVehicle);
    }

    if (req.method === 'PUT') {
      const { year, make, model, trim_lvl, mileage, color, type } = req.body;
      const updatedVehicle = await prisma.vehicle.update({
        where: { vinnum: vinnum as string },
        data: { year, make, model, trim_lvl, mileage, color, type },
      });
      return res.status(200).json(updatedVehicle);
    }

    if (req.method === 'DELETE') {
      await prisma.vehicle.delete({
        where: { vinnum: vinnum as string },
      });
      return res.status(204).end();
    }

    return res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']).status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
