import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Badge } from '@/design/components/atoms/Badge';
import { Button } from '@/design/components/atoms/Button';
import { ProductCard } from '@/design/components/molecules/ProductCard';
import { CategoryTabs } from '@/design/components/molecules/CategoryTabs';
import { CallWaiterModal } from '@/components/modals/CallWaiterModal';
import { FloatingCallButton } from '@/components/molecules/FloatingCallButton';
import { 
  categories, 
  menuItems, 
  getItemsByCategory, 
  MenuItem 
} from '@/mocks/menu';
import { 
  ShoppingCart, 
  Phone, 
  Shield, 
  Clock,
  AlertTriangle,
  Users,
  ArrowLeft,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { realTimeService, RealtimeCall } from '@/services/realTimeService';
import { toast } from '@/hooks/use-toast';

const ClientMenu: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCallWaiterOpen, setIsCallWaiterOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [activeCalls, setActiveCalls] = useState<RealtimeCall[]>([]);

  // Load active calls for this table
  useEffect(() => {
    const updateCalls = () => {
      const calls = realTimeService.getCalls();
      const tableCalls = calls.filter(call => 
        call.tableNumber === tableNumber && call.status === 'pending'
      );
      setActiveCalls(tableCalls);
    };

    // Initial load
    updateCalls();

    // Subscribe to updates
    realTimeService.on('calls_updated', updateCalls);

    return () => {
      realTimeService.off('calls_updated', updateCalls);
    };
  }, []);

  // Extract table number from token (mock)
  const tableNumber = token?.includes('mesa-') 
    ? parseInt(token.split('-')[1]) || 1 
    : 1;

  const currentCategoryItems = getItemsByCategory(activeCategory);
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartItemCount = cart.length;

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
    setSelectedItem(null);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmittingOrder(true);
    
    try {
      const orderItems = cart.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        menuItemId: item.id,
        name: item.name,
        quantity: 1,
        unitPrice: item.price,
        totalPrice: item.price,
        allergens: item.allergens
      }));

      const subtotal = cartTotal;
      const serviceCharge = subtotal * 0.1; // 10% service charge
      const total = subtotal + serviceCharge;

      realTimeService.addOrder({
        tableNumber,
        items: orderItems,
        status: 'pending',
        station: 'kitchen', // Simplified - in real app would determine based on items
        total,
      });

      toast({
        title: "Pedido enviado!",
        description: `Seu pedido da Mesa ${tableNumber} foi enviado para a cozinha.`,
      });

      // Clear cart and close
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o pedido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                  {tableNumber}
                </div>
                <div>
                  <h1 className="font-bold text-xl text-primary">Mesa {tableNumber}</h1>
                  <p className="text-sm text-muted-foreground">Cardápio Digital</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Call Waiter Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setIsCallWaiterOpen(true)}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Chamar</span>
              </Button>

              {/* Cart Button */}
              <Button 
                variant="hero" 
                size="sm" 
                className="gap-2 relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Carrinho</span>
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    size="sm" 
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">
                🔒 Seus pedidos serão entregues na Mesa {tableNumber}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Category Navigation */}
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCategoryItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>

        {/* Empty State */}
        {currentCategoryItems.length === 0 && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🍽️</div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Em breve</h3>
                <p className="text-muted-foreground">
                  Novos itens serão adicionados a esta categoria em breve.
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Seu Pedido</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  ✕
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-4xl">🛒</div>
                  <div className="space-y-2">
                    <p className="font-medium">Carrinho vazio</p>
                    <p className="text-sm text-muted-foreground">
                      Adicione itens do cardápio para começar
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <Card key={index} size="sm" className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        ✕
                      </Button>
                    </Card>
                  ))}

                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>

                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      onClick={handleSubmitOrder}
                      disabled={isSubmittingOrder}
                    >
                      {isSubmittingOrder ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Enviar Pedido - Mesa {tableNumber}
                        </div>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Taxa de serviço (10%) será adicionada na conta final
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />
          <Card className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="aspect-video relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{selectedItem.name}</h3>
                <p className="text-muted-foreground">{selectedItem.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(selectedItem.price)}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedItem.preparationTime}min</span>
                </div>
              </div>

              {selectedItem.allergens.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium text-sm">Contém Alérgenos:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.allergens.map((allergen) => (
                      <Badge key={allergen} variant="warning" size="sm">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={() => handleAddToCart(selectedItem)}
              >
                Adicionar ao Carrinho - {formatPrice(selectedItem.price)}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Call Waiter Modal */}
      <CallWaiterModal
        isOpen={isCallWaiterOpen}
        onClose={() => setIsCallWaiterOpen(false)}
        tableNumber={tableNumber}
      />

      {/* Floating Call Button */}
      <FloatingCallButton
        onClick={() => setIsCallWaiterOpen(true)}
        hasActiveCall={activeCalls.length > 0}
      />
    </div>
  );
};

export default ClientMenu;