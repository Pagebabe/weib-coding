import * as React from 'react';
import { cn } from './utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg',
        className
      )}
      style={{
        backgroundColor: 'var(--card-border)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
      {...props}
    />
  );
}

export { Skeleton };
