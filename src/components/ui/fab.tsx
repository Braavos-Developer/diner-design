import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function FAB({ children, className, ...props }: FABProps) {
  return (
    <Button
      className={cn(
        'fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'transition-all duration-200 hover:scale-110',
        'z-50 flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}