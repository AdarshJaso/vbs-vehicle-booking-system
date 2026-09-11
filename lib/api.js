export async function searchVehicles({ start_date, end_date, type, location }) {
  const params = new URLSearchParams({ start_date, end_date });
  if (type) params.set('type', type);
  if (location) params.set('location', location);
  const res = await fetch(`/api/vehicles/availability?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}
