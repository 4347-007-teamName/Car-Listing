'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditVehicle() {
  const params = useParams(); 
  const vinnum = params?.vinnum as string; 

  const [formData, setFormData] = useState({
    vinnum: '',
    year: '',
    make: '',
    model: '',
    trim_lvl: '',
    mileage: '',
    color: '',
    type: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (!vinnum) throw new Error('VIN not provided');
        const res = await fetch(`/api/vehicles/${vinnum}`);
        if (!res.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vinnum]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/vehicles/${vinnum}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update vehicle');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Vehicle</h1>

      <input
        type="text"
        name="vinnum"
        value={formData.vinnum}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        disabled
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="text"
        name="trim_lvl"
        placeholder="Trim Level"
        value={formData.trim_lvl}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      />
      <input
        type="number"
        name="mileage"
        placeholder="Mileage"
        value={formData.mileage}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}
