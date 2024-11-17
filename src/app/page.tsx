import { PrismaClient } from '@prisma/client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import CompareButton from '@/components/ui/compareButton';
const prisma = new PrismaClient();

export default async function Home() {
  const cars = await prisma.vehicle.findMany();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Car Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((vehicle) => (
          <Card key={vehicle.vinnum} className="shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle>
                {vehicle.year} - {vehicle.make} {vehicle.model} - {vehicle.trim_lvl}
              </CardTitle>
            </CardHeader>
            <div>
              <CompareButton vin={vehicle.vinnum} />
            </div>
            <div className="flex justify-between p-6 pt-0">
              <a
                href={`/vehicles/${vehicle.vinnum}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </a>
            </div>
          </Card>
        ))}
      </div>

      <div id="comparison-section" className="flex flex-wrap gap-4 mt-6 p-6 border-t-2 border-gray-200">
      </div>

    </div>
  );
}
