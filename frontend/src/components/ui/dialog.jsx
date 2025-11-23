import React, { useContext } from 'react';

const DialogContext = React.createContext({ open: false, onOpenChange: () => {} });

export function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open: !!open, onOpenChange: onOpenChange || (()=>{}) }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild, children }) {
  const { onOpenChange } = useContext(DialogContext);
  const Comp = asChild ? React.Children.only(children) : <button>{children}</button>;
  const props = { onClick: (e) => { Comp.props?.onClick?.(e); onOpenChange(true); } };
  return React.cloneElement(Comp, props);
}

export function DialogContent({ className = '', children }) {
  const { open } = useContext(DialogContext);
  if (!open) return null;
  return (
    <div role="dialog" className={`fixed inset-0 flex items-center justify-center bg-black/40 p-4`}>
      <div className={`bg-white rounded shadow-lg w-full max-w-2xl ${className}`}>{children}</div>
    </div>
  );
}
export function DialogHeader({ className = '', ...props }) { return <div className={`p-4 border-b ${className}`} {...props} />; }
export function DialogTitle({ className = '', ...props }) { return <h2 className={`text-lg font-semibold ${className}`} {...props} />; }
