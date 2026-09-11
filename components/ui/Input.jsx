export default function Input({ label, className = '', ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <input className={`border rounded-md px-3 py-2 ${className}`} {...props} />
    </div>
  );
}
