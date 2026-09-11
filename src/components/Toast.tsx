import React from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed bottom-20 inset-x-6 z-50 p-3 max-w-sm mx-auto rounded-xl bg-[#ff5540] text-white font-body-md text-xs font-semibold text-center shadow-2xl border border-white/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 cursor-pointer flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="material-symbols-outlined text-[18px] flex-shrink-0">info</span>
        <span className="truncate">{message}</span>
      </div>
      <span className="material-symbols-outlined text-[16px] flex-shrink-0 opacity-80">
        close
      </span>
    </div>
  );
};
