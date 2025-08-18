import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function QRLogin() {
  const { tableToken } = useParams<{ tableToken: string }>();
  const { loginWithQR } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleQRLogin = async () => {
      if (!tableToken) {
        toast({
          variant: 'destructive',
          title: 'Token inválido',
          description: 'Token da mesa não encontrado'
        });
        navigate('/client/login');
        return;
      }

      try {
        await loginWithQR(tableToken);
        toast({
          title: 'Acesso liberado via QR Code',
          description: 'Bem-vindo ao cardápio digital!'
        });
        navigate('/client/menu');
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro no acesso',
          description: error instanceof Error ? error.message : 'QR Code inválido ou expirado'
        });
        navigate('/client/login');
      }
    };

    handleQRLogin();
  }, [tableToken, loginWithQR, toast, navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Processando QR Code...
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Aguarde enquanto verificamos o acesso à sua mesa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}