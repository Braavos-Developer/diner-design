import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { useRealTimeStore } from '@/store/realTimeStore';
import { mockApi } from '@/lib/mockApi';
import { formatCurrency, formatTime } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Truck,
  ChefHat
} from 'lucide-react';
import { ClientGuard } from '@/components/guards/AuthGuard';

interface Order {
  id: string;
  tableId: string;
  items: any[];
  status: 'new' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const statusConfig = {
  new: {
    icon: AlertCircle,
    label: 'Recebido',
    description: 'Seu pedido foi recebido',
    color: 'text-blue-500'
  },
  preparing: {
    icon: ChefHat,
    label: 'Em preparo',
    description: 'Nossa cozinha está preparando seu pedido',
    color: 'text-orange-500'
  },
  ready: {
    icon: CheckCircle,
    label: 'Pronto',
    description: 'Seu pedido está pronto!',
    color: 'text-green-500'
  },
  delivered: {
    icon: Truck,
    label: 'Entregue',
    description: 'Pedido entregue em sua mesa',
    color: 'text-primary'
  }
};

function ClientOrderStatusContent() {
  const { orderId } = useParams<{ orderId: string }>();
  const { table } = useAuthStore();
  const { orders } = useRealTimeStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    // Update order from real-time store
    if (orders.length > 0 && orderId) {
      const updatedOrder = orders.find(o => o.id === orderId);
      if (updatedOrder) {
        setOrder(updatedOrder);
        
        // Show notification for status changes
        if (order && updatedOrder.status !== order.status) {
          const config = statusConfig[updatedOrder.status];
          toast({
            title: config.label,
            description: config.description
          });
        }
      }
    }
  }, [orders, orderId, order]);

  const loadOrder = async () => {
    if (!orderId) return;

    try {
      // In real app, you'd have a getOrder method
      const allOrders = await mockApi.getOrders();
      const foundOrder = allOrders.find(o => o.id === orderId);
      
      if (!foundOrder) {
        throw new Error('Pedido não encontrado');
      }
      
      setOrder(foundOrder);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar pedido',
        description: 'Pedido não encontrado'
      });
      navigate('/client/menu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Pedido não encontrado</h3>
          <Button onClick={() => navigate('/client/menu')}>
            Voltar ao cardápio
          </Button>
        </Card>
      </div>
    );
  }

  const currentStatus = statusConfig[order.status];
  const statusIndex = Object.keys(statusConfig).indexOf(order.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/client/menu')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-bold text-xl">Status do Pedido</h1>
              <p className="text-sm text-muted-foreground">Mesa {table?.number}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Current Status */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center ${currentStatus.color}`}>
                <currentStatus.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{currentStatus.label}</h2>
                <p className="text-muted-foreground">{currentStatus.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusConfig).map(([status, config], index) => {
                const isCompleted = index <= statusIndex;
                const isCurrent = index === statusIndex;
                const Icon = config.icon;
                
                return (
                  <div key={status} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? isCurrent 
                          ? `bg-primary text-primary-foreground` 
                          : `bg-green-500 text-white`
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {config.label}
                      </h4>
                      <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                        {config.description}
                      </p>
                    </div>

                    {isCompleted && (
                      <Badge variant={isCurrent ? 'default' : 'secondary'}>
                        {formatTime(order.updatedAt)}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pedido:</span>
              <span className="font-mono text-sm">#{order.id.slice(-6)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Horário:</span>
              <span className="text-sm">{formatTime(order.createdAt)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mesa:</span>
              <span className="text-sm">{table?.number}</span>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Itens:</h4>
              <div className="space-y-2">
                {/* Mock items - in real app this would come from the order */}
                <div className="flex justify-between text-sm">
                  <span>2x Hambúrguer Artesanal</span>
                  <span>{formatCurrency(65.80)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>2x Coca-Cola 350ml</span>
                  <span>{formatCurrency(17.80)}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {order.status === 'delivered' && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Esperamos que tenha gostado! 
            </p>
            <Button onClick={() => navigate('/client/menu')}>
              Fazer Novo Pedido
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClientOrderStatus() {
  return (
    <ClientGuard>
      <ClientOrderStatusContent />
    </ClientGuard>
  );
}