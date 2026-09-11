let bookings = [];
let nextId = 501;

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && bStart <= aEnd;
}

export function isVehicleAvailable(vehicleId, start, end) {
  return !bookings.some(
    (b) =>
      b.vehicle_id === vehicleId &&
      b.status === 'confirmed' &&
      overlaps(b.start_date, b.end_date, start, end)
  );
}

export function createBooking({ vehicle_id, start_date, end_date, customer_name }) {
  if (!isVehicleAvailable(vehicle_id, start_date, end_date)) {
    return { conflict: true };
  }
  const booking = {
    id: nextId++,
    vehicle_id,
    start_date,
    end_date,
    customer_name,
    status: 'confirmed',
  };
  bookings.push(booking);
  return { conflict: false, booking };
}

export function cancelBooking(id) {
  const booking = bookings.find((b) => b.id === Number(id));
  if (!booking) return null;
  booking.status = 'cancelled';
  return booking;
}
