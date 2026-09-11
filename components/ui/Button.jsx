export default function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'px-4 py-2 rounded-md text-sm font-medium disabled:cursor-not-allowed transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300',
    danger: 'border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
