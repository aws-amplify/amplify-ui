export function Example({ children, className = '' }) {
  return (
    <div
      className={`p-6 mb-6 rounded shadow-inner bg-gradient-to-b bg-gray-50 ${className}`}
    >
      {children}
    </div>
  );
}
