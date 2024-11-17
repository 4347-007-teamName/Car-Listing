'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    vinnum: '',
    year: '',
    make: '',
    model: '',
    trim_lvl: '',
    mileage: '',
    color: '',
    type: '',
    price: '',
    datelisted: '',
    description: '',
    sellerid: '', 
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.vinnum ||
      !formData.year ||
      !formData.make ||
      !formData.model ||
      !formData.mileage ||
      !formData.price ||
      !formData.datelisted ||
      !formData.sellerid
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: {
            vinnum: formData.vinnum.trim(),
            year: parseInt(formData.year, 10),
            make: formData.make.trim(),
            model: formData.model.trim(),
            trim_lvl: formData.trim_lvl.trim() || null,
            mileage: parseInt(formData.mileage, 10),
            color: formData.color.trim() || null,
            type: formData.type.trim() || null,
          },
          listing: {
            sellerid: parseInt(formData.sellerid, 10), 
            price: parseFloat(formData.price),
            datelisted: new Date(formData.datelisted).toISOString(),
            description: formData.description.trim() || null,
          },
        }),
      });

      if (!res.ok) {
        const responseBody = await res.json();
        throw new Error(responseBody.error || 'Failed to add vehicle and listing. Please try again.');
      }

      router.push('/admin'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Vehicle and Listing</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        name="vinnum"
        placeholder="VIN"
        value={formData.vinnum}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
        min={1900}
        max={new Date().getFullYear()}
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
        min={0}
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
        placeholder="Type (e.g., Sedan, SUV)"
        value={formData.type}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
        min={0}
      />
      <input
        type="date"
        name="datelisted"
        placeholder="Date Listed"
        value={formData.datelisted}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      ></textarea>
      <input
        type="text"
        name="sellerid"
        placeholder="Seller ID"
        value={formData.sellerid}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
        required
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
