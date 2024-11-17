import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vinnum } = req.query;

  console.log("Request for VIN:", vinnum);

  try {
    // Validate VIN parameter
    if (!vinnum) {
      return res.status(400).json({ error: 'VIN is required' });
    }

    // Fetch listing and related vehicle details
    const listing = await prisma.listing.findFirst({
      where: { vinnum: String(vinnum) },
      include: {
        vehicle: true, // Include related vehicle details
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Combine listing and vehicle details in the response
    const response = {
      vinnum: listing.vinnum,
      mileage: listing.vehicle.mileage,
      price: listing.price,
      description: listing.description,
      datelisted: listing.datelisted,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching listing details:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
