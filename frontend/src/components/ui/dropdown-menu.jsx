import React, { useState, useContext } from 'react';

const Ctx = React.createContext({ open: false, setOpen: () => {} });

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}
export function DropdownMenuTrigger({ asChild, children }) {
  const { setOpen } = useContext(Ctx);
  const Comp = asChild ? React.Children.only(children) : <button>{children}</button>;
  const props = { onClick: (e) => { Comp.props?.onClick?.(e); setOpen((v) => !v); } };
  return React.cloneElement(Comp, props);
}
export function DropdownMenuContent({ children, align = 'start' }) {
  const { open } = useContext(Ctx);
  if (!open) return null;
  return <div className="absolute mt-2 bg-white border rounded shadow p-1">{children}</div>;
}
export function DropdownMenuItem({ children, onClick }) {
  return <button onClick={onClick} className="block w-full text-left px-3 py-1.5 hover:bg-gray-100">{children}</button>;
}
