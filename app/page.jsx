'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import VehicleCard from '@/components/VehicleCard';
import { searchVehicles } from '@/lib/api';

export default function HomePage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [dates, setDates] = useState({ start_date: '', end_date: '' });

  async function handleSearch(params) {
    setLoading(true);
    setError(null);
    setSearched(true);
    setDates({ start_date: params.start_date, end_date: params.end_date });
    try {
      setVehicles(await searchVehicles(params));
    } catch {
      setError('Something went wrong while searching. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {error && <p className="text-red-600">{error}</p>}
      {!loading && searched && vehicles.length === 0 && !error && (
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
