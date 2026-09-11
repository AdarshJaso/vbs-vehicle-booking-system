export default function Select({ label, name, id, options, className = '', ...props }) {
  const fieldId = id || name;
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={fieldId} className="text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        name={name}
        className={`border rounded-md px-3 py-2 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
