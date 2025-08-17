import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/design/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
  label?: string;
  variant?: 'ghost' | 'outline';
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label = 'Voltar',
  variant = 'ghost',
  className 
}) => {
  return (
    <Link to={to}>
      <Button variant={variant} size="sm" className={className}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        {label}
      </Button>
    </Link>
  );
};