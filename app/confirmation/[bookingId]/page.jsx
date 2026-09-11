'use client';
import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // TEMPORARY: fakes cancellation locally.
  function handleCancel() {
    setCancelling(true);
    setTimeout(() => {
      setCancelled(true);
      setCancelling(false);
    }, 400);
  }

  return (
    <main className="max-w-lg mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {cancelled ? 'Booking cancelled' : 'Booking confirmed'}
      </h1>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-1">
        <p className="text-sm text-gray-500">Booking #{bookingId}</p>
        <p className="font-semibold">
          {make} {model}
        </p>
        <p className="text-sm text-gray-500">
          {startDate} to {endDate}
        </p>
      </div>
      {!cancelled ? (
        <Button variant="danger" onClick={handleCancel} disabled={cancelling} className="w-full">
          {cancelling ? 'Cancelling...' : 'Cancel booking'}
        </Button>
      ) : (
        <Button onClick={() => router.push('/')} className="w-full">
          Back to search
        </Button>
      )}
    </main>
  );
}
