'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import VehicleCard from '@/components/VehicleCard';

// TEMPORARY: hardcoded data
const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    type: 'sedan',
    location: 'Southport',
    daily_rate: 65,
    available: true,
  },
  {
    id: 2,
    make: 'Mazda',
    model: 'CX-5',
    type: 'suv',
    location: 'Southport',
    daily_rate: 95,
    available: false,
  },
  {
    id: 3,
    make: 'Hyundai',
    model: 'i30',
    type: 'hatchback',
    location: 'Broadbeach',
    daily_rate: 55,
    available: true,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [dates, setDates] = useState({ start_date: '', end_date: '' });

  function handleSearch(params) {
    setLoading(true);
    setSearched(true);
    setDates({ start_date: params.start_date, end_date: params.end_date });
    // to test loading state
    setTimeout(() => {
      setVehicles(mockVehicles);
      setLoading(false);
    }, 400);
  }

  function handleSelect(vehicle) {
    const params = new URLSearchParams({
      start_date: dates.start_date,
      end_date: dates.end_date,
      make: vehicle.make,
      model: vehicle.model,
      daily_rate: vehicle.daily_rate,
    });
    router.push(`/book/${vehicle.id}?${params.toString()}`);
  }

  return (
    <main className="w-full md:max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Find a vehicle</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      {!loading && searched && vehicles.length === 0 && (
        <p className="text-gray-500">No vehicles match your search.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onSelect={handleSelect} />
        ))}
      </div>
    </main>
  );
}
