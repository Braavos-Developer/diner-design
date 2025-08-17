import React, { useState } from 'react';
import { ArrowLeft, Download, QrCode, Copy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Badge } from '@/design/components/atoms/Badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface TableQR {
  id: string;
  number: number;
  token: string;
  url: string;
  createdAt: Date;
}

const QRCodeGenerator: React.FC = () => {
  const { toast } = useToast();
  const [tables, setTables] = useState<TableQR[]>([
    {
      id: '1',
      number: 1,
      token: 'mesa-1-abc123',
      url: `${window.location.origin}/m/mesa-1-abc123`,
      createdAt: new Date()
    },
    {
      id: '2',
      number: 2,
      token: 'mesa-2-def456',
      url: `${window.location.origin}/m/mesa-2-def456`,
      createdAt: new Date()
    },
    {
      id: '3',
      number: 7,
      token: 'mesa-7-demo',
      url: `${window.location.origin}/m/mesa-7-demo`,
      createdAt: new Date()
    }
  ]);

  const [newTableNumber, setNewTableNumber] = useState<number>(8);

  const generateToken = (tableNumber: number): string => {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `mesa-${tableNumber}-${randomString}`;
  };

  const generateQRCode = (url: string): string => {
    // Mock QR code generation - in real app would use qr-code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  const addTable = () => {
    if (tables.some(t => t.number === newTableNumber)) {
      toast({
        title: "Erro",
        description: "Já existe uma mesa com este número.",
        variant: "destructive"
      });
      return;
    }

    const token = generateToken(newTableNumber);
    const url = `${window.location.origin}/m/${token}`;
    
    const newTable: TableQR = {
      id: Date.now().toString(),
      number: newTableNumber,
      token,
      url,
      createdAt: new Date()
    };

    setTables(prev => [...prev, newTable].sort((a, b) => a.number - b.number));
    setNewTableNumber(prev => prev + 1);

    toast({
      title: "Mesa criada",
      description: `QR Code para Mesa ${newTableNumber} gerado com sucesso.`,
    });
  };

  const regenerateToken = (tableId: string) => {
    setTables(prev => prev.map(table => {
      if (table.id === tableId) {
        const newToken = generateToken(table.number);
        const newUrl = `${window.location.origin}/m/${newToken}`;
        return {
          ...table,
          token: newToken,
          url: newUrl,
          createdAt: new Date()
        };
      }
      return table;
    }));

    toast({
      title: "Token regenerado",
      description: "Novo QR Code gerado para a mesa.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "URL copiada para a área de transferência.",
    });
  };

  const downloadQR = (tableNumber: number, url: string) => {
    // Mock download - in real app would generate and download actual QR code
    const qrUrl = generateQRCode(url);
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `mesa-${tableNumber}-qr.png`;
    link.click();

    toast({
      title: "Download iniciado",
      description: `QR Code da Mesa ${tableNumber} sendo baixado.`,
    });
  };

  const removeTable = (tableId: string) => {
    setTables(prev => prev.filter(t => t.id !== tableId));
    toast({
      title: "Mesa removida",
      description: "QR Code removido com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">Gerador de QR Codes</h1>
              <p className="text-sm text-muted-foreground">Crie códigos QR para as mesas do restaurante</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        {/* Add New Table */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Adicionar Nova Mesa</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1 max-w-xs">
              <Label htmlFor="tableNumber">Número da Mesa</Label>
              <Input
                id="tableNumber"
                type="number"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>
            <Button onClick={addTable} variant="hero">
              <QrCode className="w-4 h-4 mr-2" />
              Gerar QR Code
            </Button>
          </div>
        </Card>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map(table => (
            <Card key={table.id} className="p-6">
              <div className="text-center space-y-4">
                {/* Table Header */}
                <div className="flex items-center justify-between">
                  <Badge variant="default" size="lg">
                    Mesa {table.number}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {table.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img
                    src={generateQRCode(table.url)}
                    alt={`QR Code Mesa ${table.number}`}
                    className="w-40 h-40 mx-auto"
                  />
                </div>

                {/* URL */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">URL do Cardápio</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs">
                    <code className="flex-1 truncate">{table.url}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(table.url)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full"
                    onClick={() => downloadQR(table.number, table.url)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PNG
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => regenerateToken(table.id)}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Regenerar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTable(table.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>

                {/* Test Link */}
                <Link to={`/m/${table.token}`} target="_blank">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Testar Cardápio →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {tables.length === 0 && (
          <Card className="p-12 text-center">
            <QrCode className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma mesa configurada</h3>
            <p className="text-muted-foreground mb-4">
              Adicione mesas para gerar QR Codes personalizados
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default QRCodeGenerator;