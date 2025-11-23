import React from 'react';

export function Button({ asChild, variant = 'default', size = 'md', className = '', ...props }) {
  const Comp = asChild ? 'span' : 'button';
  const variantClass = variant === 'outline' ? 'border border-gray-300 bg-white text-gray-800' : 'bg-green-600 text-white';
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2';
  return <Comp className={`rounded ${variantClass} ${sizeClass} ${className}`} {...props} />;
}
