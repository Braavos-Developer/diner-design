import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { mockApi } from '@/lib/mockApi';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { ClientGuard } from '@/components/guards/AuthGuard';

// Mock cart data - in real app this would come from cart context/store
const mockCart = [
  {
    id: 'prod_1',
    name: 'Hambúrguer Artesanal',
    price: 32.90,
    quantity: 2
  },
  {
    id: 'prod_5',
    name: 'Coca-Cola 350ml',
    price: 8.90,
    quantity: 2
  }
];

function ClientCheckoutContent() {
  const { table } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [observations, setObservations] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'pix'>('card');
  const [loading, setLoading] = useState(false);

  const subtotal = mockCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceCharge = subtotal * 0.1; // 10%
  const total = subtotal + serviceCharge;

  const handleSubmitOrder = async () => {
    if (!table) return;

    setLoading(true);
    try {
      const order = await mockApi.createOrder({
        tableId: table.id,
        items: mockCart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          observations
        })),
        status: 'new',
        total
      });

      toast({
        title: 'Pedido enviado!',
        description: 'Seu pedido foi recebido pela cozinha'
      });

      navigate(`/client/order-status/${order.id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar pedido',
        description: 'Tente novamente'
      });
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="font-bold text-xl">Finalizar Pedido</h1>
              <p className="text-sm text-muted-foreground">Mesa {table?.number}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxa de serviço (10%):</span>
                <span>{formatCurrency(serviceCharge)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="observations">
                Alguma observação especial? (Opcional)
              </Label>
              <Textarea
                id="observations"
                placeholder="Ex: Hambúrguer sem cebola, coca-cola sem gelo..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                className="h-auto p-4 flex-col gap-2"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="w-8 h-8" />
                <span>Cartão</span>
              </Button>
              <Button
                variant={paymentMethod === 'pix' ? 'default' : 'outline'}
                className="h-auto p-4 flex-col gap-2"
                onClick={() => setPaymentMethod('pix')}
              >
                <Smartphone className="w-8 h-8" />
                <span>PIX</span>
              </Button>
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                className="h-auto p-4 flex-col gap-2"
                onClick={() => setPaymentMethod('cash')}
              >
                <Banknote className="w-8 h-8" />
                <span>Dinheiro</span>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-3">
              O pagamento será processado no final da refeição
            </p>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmitOrder}
          disabled={loading}
        >
          {loading ? 'Enviando...' : `Confirmar Pedido - ${formatCurrency(total)}`}
        </Button>
      </div>
    </div>
  );
}

export default function ClientCheckout() {
  return (
    <ClientGuard>
      <ClientCheckoutContent />
    </ClientGuard>
  );
}