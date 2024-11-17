"use client";

import { useState, useEffect } from "react";

interface CompareButtonProps {
  vin: string;
}

interface Vehicle {
  vinnum: string;
  mileage: number;
  price: number;
  description: string;
  datelisted: string;
}

const CompareButton = ({ vin }: CompareButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCompareList = localStorage.getItem("compareList");
    if (storedCompareList) {
      const parsedList: Vehicle[] = JSON.parse(storedCompareList);
      setCompareList(parsedList);
      setIsSelected(parsedList.some((vehicle) => vehicle.vinnum === vin));
    }
  }, [vin]);

  const fetchVehicleDetails = async (vin: string): Promise<Vehicle | null> => {
    try {
      setLoading(true);
      const response = await fetch(`/api/listings/${vin}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vehicle details");
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      alert("Error fetching vehicle details");
      return null;
    }
  };

  const handleCompare = async () => {
    let updatedCompareList = [...compareList];

    if (updatedCompareList.some((item) => item.vinnum === vin)) {
      updatedCompareList = updatedCompareList.filter((item) => item.vinnum !== vin);
      setIsSelected(false);
    } else {
      if (updatedCompareList.length < 2) {
        const vehicleDetails = await fetchVehicleDetails(vin);
        if (vehicleDetails) {
          updatedCompareList.push(vehicleDetails);
          setIsSelected(true);
        }
      } else {
        alert("You can only compare two cars at a time!");
        return;
      }
    }
    localStorage.setItem("compareList", JSON.stringify(updatedCompareList));
    setCompareList(updatedCompareList);
  };

  return (
    <div>
      <button
        onClick={handleCompare}
        className={`text-blue-500 hover:underline ${isSelected ? "font-bold" : ""}`}
      >
        {isSelected ? "✓" : "□"} Compare
      </button>
      <ComparisonSection compareList={compareList} />
    </div>
  );
};

const ComparisonSection = ({ compareList }: { compareList: Vehicle[] }) => {
  return (
    <div id="comparison-section" className="flex flex-col md:flex-row mt-6">
      {compareList.map((vehicle) => (
        <div
          key={vehicle.vinnum}
          className="car-card p-4 border mb-4 flex-1 mr-4 bg-gray-100 rounded-md"
        >
          <p><strong>Mileage:</strong> {vehicle.mileage} miles</p>
          <p><strong>Price:</strong> ${vehicle.price.toLocaleString()}</p>
          <p><strong>Date Listed:</strong> {new Date(vehicle.datelisted).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CompareButton;
