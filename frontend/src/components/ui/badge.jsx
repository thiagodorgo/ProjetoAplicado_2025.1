import React from 'react';
export function Badge({ variant = 'secondary', className = '', ...props }) {
  const cls = variant === 'secondary' ? 'bg-gray-100 text-gray-800' : 'bg-green-600 text-white';
  return <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${cls} ${className}`} {...props} />;
}
