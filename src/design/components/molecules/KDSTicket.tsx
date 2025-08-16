import React from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { cn } from '@/lib/utils';
import { KDSTicket as KDSTicketType } from '@/mocks/orders';
import { Clock, AlertTriangle, ChefHat, Users, MessageSquare } from 'lucide-react';

interface KDSTicketProps {
  ticket: KDSTicketType;
  onStatusChange: (ticketId: string, newStatus: KDSTicketType['status']) => void;
  className?: string;
}

const formatElapsedTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  }
  return `${mins}m`;
};

const getStatusColor = (status: KDSTicketType['status']) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'preparing': return 'primary';
    case 'ready': return 'success';
    default: return 'default';
  }
};

const getPriorityColor = (priority: KDSTicketType['priority']) => {
  switch (priority) {
    case 'urgent': return 'destructive';
    case 'high': return 'warning';
    case 'normal': return 'default';
    case 'low': return 'secondary';
    default: return 'default';
  }
};

const getStationIcon = (station: KDSTicketType['station']) => {
  switch (station) {
    case 'kitchen': return <ChefHat className="w-4 h-4" />;
    case 'bar': return <Users className="w-4 h-4" />;
    case 'dessert': return <span className="text-sm">🍰</span>;
    default: return <ChefHat className="w-4 h-4" />;
  }
};

export const KDSTicket: React.FC<KDSTicketProps> = ({ 
  ticket, 
  onStatusChange, 
  className 
}) => {
  const isOverdue = ticket.isOverdue;
  const statusColor = getStatusColor(ticket.status);
  const priorityColor = getPriorityColor(ticket.priority);

  return (
    <Card 
      variant={isOverdue ? 'brand' : 'elevated'}
      className={cn(
        'transition-all duration-200 min-w-[280px] max-w-[320px]',
        isOverdue && 'ring-2 ring-destructive/20 bg-destructive/5',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          {getStationIcon(ticket.station)}
          <span className="font-bold text-lg">Mesa {ticket.tableNumber}</span>
          {isOverdue && (
            <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={priorityColor as any} size="sm">
            {ticket.priority.toUpperCase()}
          </Badge>
          <Badge variant={statusColor as any} size="sm">
            {ticket.status === 'pending' && 'Pendente'}
            {ticket.status === 'preparing' && 'Preparando'}
            {ticket.status === 'ready' && 'Pronto'}
          </Badge>
        </div>
      </div>

      {/* Timer */}
      <div className={cn(
        'px-4 py-2 flex items-center justify-between text-sm',
        isOverdue ? 'bg-destructive/10 text-destructive' : 'bg-muted/50 text-muted-foreground'
      )}>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            {formatElapsedTime(ticket.elapsedTime)}
          </span>
          <span>/ {ticket.estimatedTime}min</span>
        </div>
        
        {isOverdue && (
          <span className="text-xs font-medium bg-destructive/20 px-2 py-1 rounded">
            ATRASADO
          </span>
        )}
      </div>

      {/* Items */}
      <div className="p-4 space-y-3">
        {ticket.items.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.quantity}x</span>
                  <span className="font-semibold">{item.name}</span>
                </div>
                
                {/* Variations */}
                {item.variations && item.variations.length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.variations.map((variation) => (
                      <span key={variation.id} className="block">
                        • {variation.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Extras */}
                {item.extras && item.extras.length > 0 && (
                  <div className="mt-1 text-xs text-accent-foreground">
                    {item.extras.map((extra) => (
                      <span key={extra.id} className="block">
                        + {extra.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Special Instructions */}
            {item.specialInstructions && (
              <div className="bg-warning/10 border border-warning/20 rounded-md p-2">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-warning-foreground">
                    {item.specialInstructions}
                  </p>
                </div>
              </div>
            )}
            
            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="destructive" size="sm" className="text-xs">
                    {allergen}
                  </Badge>
                ))}
              </div>
            )}
            
            {index < ticket.items.length - 1 && (
              <div className="border-b border-border/30" />
            )}
          </div>
        ))}
      </div>

      {/* Special Instructions */}
      {ticket.specialInstructions && (
        <div className="px-4 pb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-primary-foreground">
                {ticket.specialInstructions}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-0 flex gap-2">
        {ticket.status === 'pending' && (
          <Button
            variant="hero"
            size="sm"
            className="flex-1"
            onClick={() => onStatusChange(ticket.id, 'preparing')}
          >
            Iniciar Preparo
          </Button>
        )}
        
        {ticket.status === 'preparing' && (
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            onClick={() => onStatusChange(ticket.id, 'ready')}
          >
            Marcar Pronto
          </Button>
        )}
        
        {ticket.status === 'ready' && (
          <div className="flex-1 text-center py-2">
            <Badge variant="success" size="lg" className="text-sm font-bold">
              ✓ PRONTO PARA SERVIR
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};