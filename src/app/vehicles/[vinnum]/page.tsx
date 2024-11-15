'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function VehicleDetail() {
  const pathname = usePathname();  
  const vinnum = pathname?.split('/').pop(); 
  
  const [vehicle, setVehicle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vinnum) {
      const fetchVehicle = async () => {
        try {
          const res = await fetch(`/api/vehicles/${vinnum}`);
          if (!res.ok) {
            throw new Error('Vehicle not found');
          }
          const data = await res.json();
          setVehicle(data);
        } catch (err: any) {
          setError('Vehicle not found or error occurred');
        }
      };

      fetchVehicle();
    }
  }, [vinnum]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
  <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
    {vehicle.year} - {vehicle.make} {vehicle.model}
  </h1>
  
  <div className="space-y-4">
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">VIN:</span>
      <span className="text-gray-800">{vehicle.vinnum}</span>
    </div>
    
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">Trim Level:</span>
      <span className="text-gray-800">{vehicle.trim_lvl || 'N/A'}</span>
    </div>
    
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">Mileage:</span>
      <span className="text-gray-800">{vehicle.mileage.toLocaleString()} miles</span>
    </div>
    
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">Color:</span>
      <span className="text-gray-800">{vehicle.color || 'N/A'}</span>
    </div>
    
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">Type:</span>
      <span className="text-gray-800">{vehicle.type || 'N/A'}</span>
    </div>
  </div>

  <div className="mt-6 text-center">
    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
      Contact Seller
    </button>
  </div>
</div>

  );
}
