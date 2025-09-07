import { ReactNode } from 'react';

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: 'available' | 'reserved' | 'sold' | 'rented';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    available: { label: 'Verfügbar', variant: 'success' as const },
    reserved: { label: 'Reserviert', variant: 'warning' as const },
    sold: { label: 'Verkauft', variant: 'error' as const },
    rented: { label: 'Vermietet', variant: 'info' as const }
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

// Price Display Component
interface PriceDisplayProps {
  price: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PriceDisplay({ price, currency = 'THB', size = 'lg', className = '' }: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const formattedPrice = new Intl.NumberFormat('de-DE').format(price);

  return (
    <div className={`font-bold ${sizeClasses[size]} ${className}`} style={{ color: 'var(--color-primary)' }}>
      {formattedPrice} {currency}
    </div>
  );
}

// Feature List Component
interface FeatureListProps {
  features: string[];
  maxItems?: number;
  showMore?: boolean;
  className?: string;
}

export function FeatureList({ features, maxItems = 3, showMore = true, className = '' }: FeatureListProps) {
  const displayFeatures = features.slice(0, maxItems);
  const remainingCount = features.length - maxItems;

  return (
    <div className={`space-y-2 ${className}`}>
      {displayFeatures.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
          <span style={{ color: 'var(--color-muted)' }}>{feature}</span>
        </div>
      ))}
      {showMore && remainingCount > 0 && (
        <div className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
          +{remainingCount} weitere Features
        </div>
      )}
    </div>
  );
}

// Property Stats Component
interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  area?: number;
  className?: string;
}

export function PropertyStats({ bedrooms, bathrooms, area, className = '' }: PropertyStatsProps) {
  return (
    <div className={`flex items-center gap-4 text-sm ${className}`}>
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
        <span>{bedrooms} BR</span>
      </div>
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
        <span>{bathrooms} BA</span>
      </div>
      {area && (
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>{area} m²</span>
        </div>
      )}
    </div>
  );
}

// Location Badge Component
interface LocationBadgeProps {
  location: string;
  district?: string;
  className?: string;
}

export function LocationBadge({ location, district, className = '' }: LocationBadgeProps) {
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`} style={{ color: 'var(--color-muted)' }}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{location}{district && ` · ${district}`}</span>
    </div>
  );
}

// Action Button Component
interface ActionButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function ActionButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  onClick, 
  className = '',
  disabled = false
}: ActionButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'text-white hover:opacity-90 focus:ring-blue-500',
    secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const primaryStyle = variant === 'primary' ? { backgroundColor: 'var(--color-primary)' } : {};

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={primaryStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

// Card Component with enhanced styling
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${paddingClasses[padding]} ${hoverClasses} ${className}`} style={{ borderColor: 'var(--card-border)' }}>
      {children}
    </div>
  );
}

// Divider Component
interface DividerProps {
  className?: string;
  text?: string;
}

export function Divider({ className = '', text }: DividerProps) {
  if (text) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: 'var(--card-border)' }}></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white" style={{ color: 'var(--color-muted)' }}>
            {text}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-t ${className}`} style={{ borderColor: 'var(--card-border)' }}></div>
  );
}

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}></div>
  );
}

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, className = '', showLabel = false }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: 'var(--color-text)' }}>Fortschritt</span>
          <span style={{ color: 'var(--color-muted)' }}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: 'var(--color-primary)'
          }}
        ></div>
      </div>
    </div>
  );
}
