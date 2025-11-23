import React from 'react';
export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded ${className}`}>
      <div className="h-2 bg-green-600 rounded" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
