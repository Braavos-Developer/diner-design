import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FAB } from '@/components/ui/fab';
import { useAuthStore } from '@/store/authStore';
import { mockApi } from '@/lib/mockApi';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  Search, 
  Phone, 
  Shield, 
  Clock,
  AlertTriangle,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { ClientGuard } from '@/components/guards/AuthGuard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  allergens: string[];
  tags: string[];
  preparationTime: number;
}

interface CartItem extends Product {
  quantity: number;
  observations?: string;
}

const categories = [
  'Todos',
  'Lanches',
  'Pizzas', 
  'Saladas',
  'Peixes',
  'Bebidas'
];

function ClientMenuContent() {
  const { table, logout } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await mockApi.getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar produtos',
        description: 'Não foi possível carregar o cardápio'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.available;
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    toast({
      title: 'Item adicionado',
      description: `${product.name} foi adicionado ao carrinho`
    });
    
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCallWaiter = async (reason: string, message?: string) => {
    if (!table) return;
    
    try {
      await mockApi.createCall({
        tableId: table.id,
        reason: reason as any,
        message,
        status: 'open'
      });
      
      toast({
        title: 'Garçom chamado',
        description: 'Seu chamado foi enviado com sucesso!'
      });
      
      setIsCallModalOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao chamar garçom',
        description: error instanceof Error ? error.message : 'Tente novamente'
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/client/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                {table?.number}
              </div>
              <div>
                <h1 className="font-bold text-xl">Mesa {table?.number}</h1>
                <p className="text-sm text-muted-foreground">Cardápio Digital</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
              
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
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
                🔒 Seus pedidos serão entregues na Mesa {table?.number}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Categories */}
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-video relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-primary">
                      {formatCurrency(product.price)}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{product.preparationTime}min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou categoria
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* FAB - Call Waiter */}
      <FAB onClick={() => setIsCallModalOpen(true)}>
        <Phone className="w-6 h-6" />
      </FAB>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="aspect-video relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <Button 
                variant="secondary" 
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                <p className="text-muted-foreground">{selectedProduct.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(selectedProduct.price)}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedProduct.preparationTime}min</span>
                </div>
              </div>

              {selectedProduct.allergens.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium text-sm">Contém Alérgenos:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedProduct.allergens.map((allergen) => (
                      <Badge key={allergen} variant="outline">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={() => addToCart(selectedProduct)}
              >
                Adicionar ao Carrinho - {formatCurrency(selectedProduct.price)}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Seu Pedido</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-4 h-4" />
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
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Finalizar Pedido
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

      {/* Call Waiter Modal */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <Phone className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Chamar Garçom</h3>
                <p className="text-muted-foreground text-sm">
                  Selecione o motivo da chamada
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'water', label: 'Água' },
                  { id: 'cutlery', label: 'Talheres' },
                  { id: 'bill', label: 'Conta' },
                  { id: 'help', label: 'Ajuda' }
                ].map((reason) => (
                  <Button
                    key={reason.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleCallWaiter(reason.id)}
                  >
                    {reason.label}
                  </Button>
                ))}
              </div>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setIsCallModalOpen(false)}
              >
                Cancelar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function ClientMenu() {
  return (
    <ClientGuard>
      <ClientMenuContent />
    </ClientGuard>
  );
}