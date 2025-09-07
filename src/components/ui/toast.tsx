import * as React from 'react';
import { cn } from './utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  type = 'info',
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 300);
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: {
      bg: 'var(--color-primary)',
      border: 'var(--color-primary)',
      text: 'white'
    },
    error: {
      bg: '#ef4444',
      border: '#ef4444',
      text: 'white'
    },
    warning: {
      bg: '#f59e0b',
      border: '#f59e0b',
      text: 'white'
    },
    info: {
      bg: 'var(--color-muted)',
      border: 'var(--color-muted)',
      text: 'white'
    }
  };

  const Icon = icons[type];
  const color = colors[type];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      style={{
        backgroundColor: color.bg,
        borderColor: color.border,
        color: color.text,
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className="mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          {title && (
            <div className="font-semibold text-sm">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90 mt-1">{description}</div>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:opacity-80 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export { Toast };
