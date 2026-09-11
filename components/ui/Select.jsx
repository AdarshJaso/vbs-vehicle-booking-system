export default function Select({ label, options, className = '', ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <select className={`border rounded-md px-3 py-2 ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
