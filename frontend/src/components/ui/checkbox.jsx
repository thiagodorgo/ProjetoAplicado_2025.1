import React from 'react';
export const Checkbox = React.forwardRef(({ className = '', ...props }, ref) => (
  <input ref={ref} type="checkbox" className={`w-4 h-4 rounded border-gray-300 ${className}`} {...props} />
));
