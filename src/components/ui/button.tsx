import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const variants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-white hover:opacity-90',
        outline: 'border hover:opacity-80',
        ghost: 'hover:opacity-80',
      },
      size: { sm:'h-9 px-3', md:'h-10 px-4', lg:'h-11 px-5 text-base' },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> { asChild?: boolean; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild=false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(variants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';
