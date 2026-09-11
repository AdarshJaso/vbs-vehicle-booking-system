import { NextResponse } from 'next/server';
import { cancelBooking } from '@/data/store';

export async function DELETE(request, context) {
  const { id } = await context.params;
  const booking = cancelBooking(id);
  if (!booking) {
    return NextResponse.json({ error: 'not_found', message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ booking_id: booking.id, status: booking.status });
}
