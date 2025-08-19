import React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingCallButtonProps {
  onClick: () => void;
  hasActiveCall?: boolean;
  className?: string;
}

export const FloatingCallButton: React.FC<FloatingCallButtonProps> = ({
  onClick,
  hasActiveCall = false,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-full',
        'bg-gradient-brand text-white shadow-lg',
        'hover:shadow-xl hover:scale-110',
        'transition-all duration-200',
        'flex items-center justify-center',
        'ring-0 focus:ring-4 focus:ring-primary/30',
        hasActiveCall && 'animate-pulse ring-4 ring-warning/50',
        className
      )}
      aria-label="Chamar Garçom"
    >
      <Phone className={cn('w-6 h-6', hasActiveCall && 'animate-bounce')} />
      {hasActiveCall && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        </div>
      )}
    </button>
  );
};