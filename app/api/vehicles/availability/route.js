import { NextResponse } from 'next/server';
import { vehicles } from '@/data/vehicles';
import { isVehicleAvailable } from '@/data/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start_date');
  const end = searchParams.get('end_date');
  const type = searchParams.get('type');
  const location = searchParams.get('location');

  if (!start || !end) {
    return NextResponse.json(
      { error: 'invalid_request', message: 'start_date and end_date are required' },
      { status: 400 }
    );
  }

  let results = vehicles.map((v) => ({ ...v, available: isVehicleAvailable(v.id, start, end) }));
  if (type) results = results.filter((v) => v.type === type);
  if (location) results = results.filter((v) => v.location === location);

  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json(results);
}
