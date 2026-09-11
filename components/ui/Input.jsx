export default function Input({ label, name, id, className = '', ...props }) {
  const fieldId = id || name;
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={fieldId} className="text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}
      <input
        id={fieldId}
        name={name}
        className={`border rounded-md px-3 py-2 ${className}`}
        {...props}
      />
    </div>
  );
}
