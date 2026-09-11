import Button from '@/components/ui/Button';

export default function VehicleCard({ vehicle, onSelect }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white shadow-sm">
      <div>
        <p className="font-semibold text-lg">
          {vehicle.make} {vehicle.model}
        </p>
        <p className="text-sm text-gray-500 capitalize">
          {vehicle.type} | {vehicle.location}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-medium">${vehicle.daily_rate}/day</p>
        <Button onClick={() => onSelect(vehicle)} disabled={!vehicle.available}>
          {vehicle.available ? 'Select' : 'Unavailable'}
        </Button>
      </div>
    </div>
  );
}
