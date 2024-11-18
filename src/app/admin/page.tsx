'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Vehicle {
  vinnum: string;
  make: string;
  model: string;
  mileage?: number;
  color?: string;
  type?: string;
}

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');
        if (!res.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data: Vehicle[] = await res.json();
        setVehicles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (vinnum: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/vehicles/${vinnum}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete vehicle');
      }

      setVehicles((prev) => prev.filter((vehicle) => vehicle.vinnum !== vinnum));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <a
        href="/admin/vehicles/new"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Vehicle
      </a>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">VIN</th>
            <th className="border border-gray-300 px-4 py-2">Make</th>
            <th className="border border-gray-300 px-4 py-2">Model</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vinnum}>
              <td className="border border-gray-300 px-4 py-2">{vehicle.vinnum}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.make}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.model}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`/admin/vehicles/edit/${vehicle.vinnum}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(vehicle.vinnum)}
                  className="text-red-500 hover:underline"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-500 text-white mt-4 px-4 py-2 rounded mb-4"
      >
        Back to Homepage
      </button>
    </div>
  );
}
