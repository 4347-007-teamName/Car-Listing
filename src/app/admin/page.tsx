'use client';

import { useEffect, useState } from 'react';

interface Vehicle {
  vinnum: string;
  make: string;
  model: string;
}

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (vinnum: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/vehicles/${vinnum}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete vehicle');
      }
      setVehicles((prev) => prev.filter((vehicle) => vehicle.vinnum !== vinnum));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <a
        href="/admin/vehicles/new"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Vehicle
      </a>
      {vehicles.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
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
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
