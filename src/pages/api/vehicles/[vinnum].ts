import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { vinnum } = req.query;
  console.log("Request VIN:", vinnum);
  
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { vinnum: String(vinnum) },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    return res.status(200).json(vehicle);
  } catch (err) {
    console.error('Error fetching vehicle:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
