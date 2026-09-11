import { NextResponse } from 'next/server';
import { createBooking } from '@/data/store';

export async function POST(request) {
  const body = await request.json();
  const { vehicle_id, start_date, end_date, customer_name } = body;

  if (!vehicle_id || !start_date || !end_date || !customer_name) {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Missing required fields' },
      { status: 400 }
    );
  }

  await new Promise((r) => setTimeout(r, 300));
  const result = createBooking({ vehicle_id, start_date, end_date, customer_name });

  if (result.conflict) {
    return NextResponse.json(
      { error: 'vehicle_unavailable', message: 'This vehicle was booked by another customer' },
      { status: 409 }
    );
  }

  const b = result.booking;
  return NextResponse.json({
    booking_id: b.id,
    status: b.status,
    vehicle_id: b.vehicle_id,
    start_date: b.start_date,
    end_date: b.end_date,
  });
}
