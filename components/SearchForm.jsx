'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const TYPE_OPTIONS = [
  { value: '', label: 'Any' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'ute', label: 'Ute' },
];

const LOCATION_OPTIONS = [
  { value: '', label: 'Any' },
  { value: 'Southport', label: 'Southport' },
  { value: 'Broadbeach', label: 'Broadbeach' },
  { value: 'Surfers Paradise', label: 'Surfers Paradise' },
];

export default function SearchForm({ onSearch, loading }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ start_date: startDate, end_date: endDate, type, location });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-white p-4 rounded-lg shadow-sm"
    >
      <Input
        name="start_date"
        label="Start date"
        type="date"
        required
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        name="end_date"
        label="End date"
        type="date"
        required
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Select
        name="type"
        label="Type"
        options={TYPE_OPTIONS}
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <Select
        name="location"
        label="Location"
        options={LOCATION_OPTIONS}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button type="submit" disabled={loading} className="self-end">
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
