'use client';
import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createBookingRequest } from '@/lib/api';

export default function BookPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const startDate = searchParams.get('start_date') || '';
  const endDate = searchParams.get('end_date') || '';
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const dailyRate = searchParams.get('daily_rate');

  const [customerName, setCustomerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setConflict(false);
    setError(null);
    try {
      const booking = await createBookingRequest({
        vehicle_id: Number(id),
        start_date: startDate,
        end_date: endDate,
        customer_name: customerName,
      });
      const params = new URLSearchParams({
        start_date: booking.start_date,
        end_date: booking.end_date,
        make,
        model,
      });
      router.push(`/confirmation/${booking.booking_id}?${params.toString()}`);
    } catch (err) {
      if (err.code === 'vehicle_unavailable') {
        setConflict(true);
      } else {
        setError('Something went wrong submitting your booking. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-lg mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Confirm your booking</h1>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-1">
        <p className="font-semibold">
          {make} {model}
        </p>
        <p className="text-sm text-gray-500">${dailyRate}/day</p>
        <p className="text-sm text-gray-500">
          {startDate} to {endDate}
        </p>
      </div>

      {conflict && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm">
          This vehicle was just booked by another customer.{' '}
          <button onClick={() => router.push('/')} className="underline font-medium">
            Back to search
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Button type="submit" disabled={submitting || conflict} className="w-full">
          {submitting ? 'Booking...' : 'Confirm booking'}
        </Button>
      </form>
    </main>
  );
}
