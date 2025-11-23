import React from 'react';

const Ctx = React.createContext({ open: false, onOpenChange: () => {} });

export function Select({ value, onValueChange, children }) {
  const items = [];
  React.Children.forEach(children, (child) => {
    if (child && child.type && child.type.displayName === 'SelectContent') {
      React.Children.forEach(child.props.children, (item) => {
        if (item && item.type && item.type.displayName === 'SelectItem') {
          items.push({ value: item.props.value, label: item.props.children });
        }
      });
    }
  });
  return (
    <select value={value} onChange={(e) => onValueChange && onValueChange(e.target.value)} className="border rounded px-3 py-2 w-full">
      {items.map((i) => (
        <option key={i.value} value={i.value}>{i.label}</option>
      ))}
    </select>
  );
}

export function SelectTrigger({ children }) { return <>{children}</>; }
SelectTrigger.displayName = 'SelectTrigger';
export function SelectValue(props) { return <span {...props} />; }
SelectValue.displayName = 'SelectValue';
export function SelectContent({ children }) { return <>{children}</>; }
SelectContent.displayName = 'SelectContent';
export function SelectItem({ children }) { return <>{children}</>; }
SelectItem.displayName = 'SelectItem';
