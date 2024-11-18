"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Vehicle {
  vinnum: string;
  year: number;
  make: string;
  model: string;
  trim_lvl?: string;
  mileage: number;
  color?: string;
  type?: string;
}

interface Listing {
  description?: string;
  sellerid?: number;
}

interface Seller {
  firstname: string;
  middleinit?: string;
  lastname: string;
}

export default function VehicleDetail() {
  const pathname = usePathname();
  const vinnum = pathname?.split("/").pop();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (vinnum) {
      const fetchDetails = async () => {
        try {
          const vehicleRes = await fetch(`/api/vehicles/${vinnum}`);
          if (!vehicleRes.ok) {
            throw new Error("Vehicle not found");
          }
          const vehicleData: Vehicle = await vehicleRes.json();
          setVehicle(vehicleData);

          const listingRes = await fetch(`/api/listings/${vinnum}`);
          if (!listingRes.ok) {
            throw new Error("Listing not found");
          }
          const listingData: Listing = await listingRes.json();
          console.log("Fetched Listing:", listingData);
          setListing(listingData);

          if (listingData.sellerid) {
            const sellerRes = await fetch(`/api/users/${listingData.sellerid}`);
            if (!sellerRes.ok) {
              throw new Error("Seller not found");
            }
            const sellerData: Seller = await sellerRes.json();
            console.log("Fetched Seller:", sellerData);
            setSeller(sellerData);
          }
        } catch (err) {
          console.error("Error:", err);
          setError("Error occurred while fetching data");
        }
      };

      fetchDetails();
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
        {listing && listing.description && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Description:</span>
            <span className="text-gray-800">{listing.description}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">VIN:</span>
          <span className="text-gray-800">{vehicle.vinnum}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Trim Level:</span>
          <span className="text-gray-800">{vehicle.trim_lvl || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Mileage:</span>
          <span className="text-gray-800">
            {vehicle.mileage.toLocaleString()} miles
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Color:</span>
          <span className="text-gray-800">{vehicle.color || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Type:</span>
          <span className="text-gray-800">{vehicle.type || "N/A"}</span>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
