import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Smartphone, QrCode } from 'lucide-react';

export default function ClientLogin() {
  const [tableNumber, setTableNumber] = useState('');
  const [pin, setPin] = useState('');
  const { loginTable, loading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Auto-fill for demo
    if (searchParams.get('demo') === '1') {
      setTableNumber('7');
      setPin('0007');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await loginTable(parseInt(tableNumber), pin);
      toast({
        title: 'Acesso liberado',
        description: `Bem-vindo à Mesa ${tableNumber}!`
      });
      navigate('/client/menu');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no acesso',
        description: error instanceof Error ? error.message : 'Mesa ou PIN inválido'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Cardápio Digital</CardTitle>
          <CardDescription>
            Acesse o cardápio da sua mesa
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber">Número da Mesa</Label>
              <Input
                id="tableNumber"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Ex: 7"
                min="1"
                max="99"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pin">PIN da Mesa</Label>
              <Input
                id="pin"
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="0000"
                maxLength={4}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Acessar Cardápio'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <QrCode className="w-4 h-4" />
              <span>Ou escaneie o QR Code da mesa</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}