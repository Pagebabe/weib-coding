import { ReactNode } from 'react';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
  children?: ReactNode;
  alt?: string;
}

export function ImagePlaceholder({ 
  width = 400, 
  height = 300, 
  className = '', 
  children,
  alt = 'Placeholder'
}: ImagePlaceholderProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      {children || (
        <div className="text-center text-gray-400">
          <svg 
            className="w-12 h-12 mx-auto mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-sm">{alt}</p>
        </div>
      )}
    </div>
  );
}

// Property Image Placeholder
export function PropertyImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <ImagePlaceholder 
      className={`rounded-lg ${className}`}
      alt="Immobilien-Bild"
    >
      <div className="text-center text-gray-400">
        <svg 
          className="w-16 h-16 mx-auto mb-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        <p className="text-sm font-medium">Immobilien-Bild</p>
        <p className="text-xs text-gray-300 mt-1">Bild wird geladen...</p>
      </div>
    </ImagePlaceholder>
  );
}

// Hero Image Placeholder
export function HeroImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <ImagePlaceholder 
      width={1200}
      height={500}
      className={`rounded-2xl ${className}`}
      alt="Hero-Banner"
    >
      <div className="text-center text-gray-400">
        <svg 
          className="w-24 h-24 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-lg font-medium">Hero-Banner</p>
        <p className="text-sm text-gray-300 mt-2">Professionelle Immobilien-Bilder</p>
      </div>
    </ImagePlaceholder>
  );
}

// Service Icon Placeholder
export function ServiceIconPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ${className}`}>
      <svg 
        className="w-8 h-8 text-blue-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 10V3L4 14h7v7l9-11h-7z" 
        />
      </svg>
    </div>
  );
}

// Avatar Placeholder
export function AvatarPlaceholder({ 
  size = 40, 
  className = '' 
}: { 
  size?: number; 
  className?: string; 
}) {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        className="w-6 h-6 text-gray-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    </div>
  );
}
