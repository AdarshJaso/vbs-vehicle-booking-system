export async function searchVehicles({ start_date, end_date, type, location }) {
  const params = new URLSearchParams({ start_date, end_date });
  if (type) params.set('type', type);
  if (location) params.set('location', location);
  const res = await fetch(`/api/vehicles/availability?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}

export async function createBookingRequest(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || 'Booking failed');
    err.code = data.error;
    throw err;
  }
  return data;
}

export async function cancelBookingRequest(id) {
  const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to cancel booking');
  return res.json();
}
