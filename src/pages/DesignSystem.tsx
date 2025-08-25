import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ColorPicker } from '@/components/ui/color-picker';
import { useThemeCustomization } from '@/hooks/useThemeCustomization';
import { Separator } from '@/components/ui/separator';
import { Palette, RotateCcw, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DesignSystem = () => {
  const { colors, updateColor, resetToDefault } = useThemeCustomization();
  const { toast } = useToast();

  const handleSaveTheme = () => {
    toast({
      title: "Tema Salvo!",
      description: "Suas personalizações foram salvas com sucesso.",
    });
  };

  const handleReset = () => {
    resetToDefault();
    toast({
      title: "Tema Restaurado",
      description: "O tema foi restaurado para as cores padrão.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Design System</h1>
              <p className="text-muted-foreground">Personalize as cores do seu RestaurantOS</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSaveTheme} className="gap-2">
              <Save className="w-4 h-4" />
              Salvar Tema
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrão
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Color Customization Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cores Principais</CardTitle>
                <CardDescription>Configure as cores primárias do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Cor Primária"
                  value={colors.primary}
                  onChange={(color) => updateColor('primary', color)}
                />
                <ColorPicker
                  label="Cor de Destaque"
                  value={colors.accent}
                  onChange={(color) => updateColor('accent', color)}
                />
                <ColorPicker
                  label="Cor Secundária"
                  value={colors.secondary}
                  onChange={(color) => updateColor('secondary', color)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cores de Status</CardTitle>
                <CardDescription>Cores para estados e notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Sucesso"
                  value={colors.success}
                  onChange={(color) => updateColor('success', color)}
                />
                <ColorPicker
                  label="Aviso"
                  value={colors.warning}
                  onChange={(color) => updateColor('warning', color)}
                />
                <ColorPicker
                  label="Erro"
                  value={colors.destructive}
                  onChange={(color) => updateColor('destructive', color)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cores de Interface</CardTitle>
                <CardDescription>Cores de fundo e elementos de interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Fundo"
                  value={colors.background}
                  onChange={(color) => updateColor('background', color)}
                />
                <ColorPicker
                  label="Texto"
                  value={colors.foreground}
                  onChange={(color) => updateColor('foreground', color)}
                />
                <ColorPicker
                  label="Cartões"
                  value={colors.card}
                  onChange={(color) => updateColor('card', color)}
                />
                <ColorPicker
                  label="Bordas"
                  value={colors.border}
                  onChange={(color) => updateColor('border', color)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview em Tempo Real
                </CardTitle>
                <CardDescription>Veja como ficam as cores aplicadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Palette Preview */}
                <div>
                  <h4 className="font-medium mb-3">Paleta de Cores</h4>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-2"></div>
                      <p className="text-xs">Primária</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent rounded-lg mx-auto mb-2"></div>
                      <p className="text-xs">Destaque</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-success rounded-lg mx-auto mb-2"></div>
                      <p className="text-xs">Sucesso</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-warning rounded-lg mx-auto mb-2"></div>
                      <p className="text-xs">Aviso</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Button Preview */}
                <div>
                  <h4 className="font-medium mb-3">Botões</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button>Primário</Button>
                    <Button variant="secondary">Secundário</Button>
                    <Button variant="outline">Contorno</Button>
                    <Button variant="destructive">Erro</Button>
                  </div>
                </div>

                <Separator />

                {/* Badge Preview */}
                <div>
                  <h4 className="font-medium mb-3">Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Padrão</Badge>
                    <Badge variant="secondary">Secundário</Badge>
                    <Badge variant="destructive">Erro</Badge>
                    <Badge variant="outline">Contorno</Badge>
                  </div>
                </div>

                <Separator />

                {/* Card Preview */}
                <div>
                  <h4 className="font-medium mb-3">Cartão de Exemplo</h4>
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-brand rounded-lg"></div>
                      <div>
                        <h5 className="font-medium">Mesa 15</h5>
                        <p className="text-sm text-muted-foreground">2 itens</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Aceitar</Button>
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Gradient Preview */}
                <div>
                  <h4 className="font-medium mb-3">Gradientes</h4>
                  <div className="space-y-2">
                    <div className="h-12 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-medium">
                      Gradiente Principal
                    </div>
                    <div className="h-12 bg-gradient-warm rounded-lg flex items-center justify-center font-medium">
                      Gradiente Quente
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;