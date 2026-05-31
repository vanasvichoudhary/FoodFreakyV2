import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-500" />;
            case 'warning':
              return <AlertCircle className="w-5 h-5 text-amber-500" />;
            case 'info':
            default:
              return <Info className="w-5 h-5 text-blue-500" />;
          }
        };

        const getBgColor = () => {
          switch (toast.type) {
            case 'success':
              return 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900';
            case 'error':
              return 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-900';
            case 'warning':
              return 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900';
            case 'info':
            default:
              return 'bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-900';
          }
        };

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl pointer-events-auto transition-all duration-300 animate-fade-in-up ${getBgColor()}`}
            style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
