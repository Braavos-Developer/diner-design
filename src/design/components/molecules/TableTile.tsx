import React from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { cn } from '@/lib/utils';
import { Table } from '@/mocks/tables';
import { Users, Clock, DollarSign, AlertCircle, Wrench } from 'lucide-react';

interface TableTileProps {
  table: Table;
  onTableSelect: (table: Table) => void;
  className?: string;
}

const getStatusConfig = (status: Table['status']) => {
  switch (status) {
    case 'available':
      return {
        color: 'success',
        icon: '✓',
        label: 'Livre',
        bgClass: 'bg-success/10 border-success/20'
      };
    case 'occupied':
      return {
        color: 'primary',
        icon: '👥',
        label: 'Ocupada',
        bgClass: 'bg-primary/10 border-primary/20'
      };
    case 'reserved':
      return {
        color: 'warning',
        icon: '📅',
        label: 'Reservada',
        bgClass: 'bg-warning/10 border-warning/20'
      };
    case 'needs_service':
      return {
        color: 'destructive',
        icon: '🔔',
        label: 'Chamada',
        bgClass: 'bg-destructive/10 border-destructive/20 animate-pulse'
      };
    case 'needs_cleaning':
      return {
        color: 'secondary',
        icon: '🧹',
        label: 'Limpeza',
        bgClass: 'bg-secondary border-secondary/40'
      };
    case 'out_of_order':
      return {
        color: 'destructive',
        icon: '⚠️',
        label: 'Fora de Uso',
        bgClass: 'bg-destructive/20 border-destructive/40'
      };
    default:
      return {
        color: 'default',
        icon: '?',
        label: 'Indefinido',
        bgClass: 'bg-muted border-muted-foreground/20'
      };
  }
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDuration = (startTime: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 60) {
    return `${diffMins}min`;
  }
  
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours}h ${mins.toString().padStart(2, '0')}min`;
};

export const TableTile: React.FC<TableTileProps> = ({ 
  table, 
  onTableSelect, 
  className 
}) => {
  const statusConfig = getStatusConfig(table.status);
  const isInteractive = table.status !== 'out_of_order';

  return (
    <Card
      variant={isInteractive ? 'interactive' : 'default'}
      className={cn(
        'relative min-h-[120px] transition-all duration-200 cursor-pointer',
        statusConfig.bgClass,
        !isInteractive && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={() => isInteractive && onTableSelect(table)}
    >
      {/* Status Badge */}
      <div className="absolute top-2 right-2">
        <Badge 
          variant={statusConfig.color as any} 
          size="sm"
          className="text-xs font-bold"
        >
          {statusConfig.label}
        </Badge>
      </div>

      {/* Table Number */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          {/* Icon/Status */}
          <div className="text-2xl">
            {statusConfig.icon}
          </div>
          
          {/* Table Number */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold">
              Mesa {table.number}
            </h3>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{table.capacity} lugares</span>
            </div>
          </div>

          {/* Additional Info */}
          {table.currentOrder && (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-sm">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold">
                  {formatCurrency(table.currentOrder.total)}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(table.currentOrder.startTime)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {table.currentOrder.itemCount} itens
              </div>
            </div>
          )}

          {/* Out of order reason */}
          {table.status === 'out_of_order' && (
            <div className="flex items-center justify-center gap-1 text-xs text-destructive">
              <Wrench className="w-3 h-3" />
              <span>Manutenção</span>
            </div>
          )}

          {/* Needs service indicator */}
          {table.status === 'needs_service' && (
            <div className="flex items-center justify-center gap-1 text-xs text-destructive animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span className="font-medium">Precisa Atendimento</span>
            </div>
          )}
        </div>
      </div>

      {/* Section Indicator */}
      <div className="absolute bottom-2 left-2">
        <Badge variant="outline" size="sm" className="text-xs">
          Seção {table.section}
        </Badge>
      </div>

      {/* QR Code Indicator */}
      {table.status === 'available' && (
        <div className="absolute bottom-2 right-2">
          <div className="w-6 h-6 bg-primary/20 rounded border border-primary/30 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">QR</span>
          </div>
        </div>
      )}
    </Card>
  );
};