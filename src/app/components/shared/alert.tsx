import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Alert = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Alert Box */}
      <div className="relative bg-zinc-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export default Alert;
