import React, { useState } from 'react';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Badge } from '@/design/components/atoms/Badge';
import { 
  Phone, 
  Droplets, 
  Utensils, 
  Receipt, 
  HelpCircle,
  MessageSquare,
  X
} from 'lucide-react';
import { realTimeService } from '@/services/realTimeService';
import { toast } from '@/hooks/use-toast';

interface CallWaiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number;
}

const callOptions = [
  {
    type: 'water' as const,
    icon: Droplets,
    label: 'Preciso de Água',
    description: 'Solicitar água para a mesa',
    priority: 'normal' as const,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    type: 'utensils' as const,
    icon: Utensils,
    label: 'Talheres / Guardanapos',
    description: 'Solicitar talheres ou guardanapos',
    priority: 'normal' as const,
    color: 'bg-gray-50 text-gray-600 border-gray-200'
  },
  {
    type: 'bill' as const,
    icon: Receipt,
    label: 'Fechar a Conta',
    description: 'Solicitar a conta para pagamento',
    priority: 'high' as const,
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    type: 'assistance' as const,
    icon: HelpCircle,
    label: 'Preciso de Ajuda',
    description: 'Assistência geral do garçom',
    priority: 'normal' as const,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  }
];

export const CallWaiterModal: React.FC<CallWaiterModalProps> = ({
  isOpen,
  onClose,
  tableNumber
}) => {
  const [selectedOption, setSelectedOption] = useState<typeof callOptions[0] | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCall = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);
    
    try {
      realTimeService.addCall({
        tableNumber,
        type: selectedOption.type,
        message: customMessage.trim() || undefined,
        priority: selectedOption.priority,
        status: 'pending'
      });

      toast({
        title: "Garçom chamado!",
        description: `Seu pedido foi enviado. Um garçom atenderá a Mesa ${tableNumber} em breve.`,
      });

      onClose();
      setSelectedOption(null);
      setCustomMessage('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível chamar o garçom. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <Card className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                {tableNumber}
              </div>
              <div>
                <h2 className="text-xl font-bold">Chamar Garçom</h2>
                <p className="text-sm text-muted-foreground">Mesa {tableNumber}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Call Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Como podemos ajudar?
            </h3>
            <div className="space-y-2">
              {callOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOption?.type === option.type;
                
                return (
                  <button
                    key={option.type}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left hover:scale-105 ${
                      isSelected
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-background hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg border ${option.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.label}</span>
                          {option.priority === 'high' && (
                            <Badge variant="warning" size="sm">Urgente</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Message */}
          {selectedOption && (
            <div className="space-y-3">
              <label className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Observações (opcional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Digite aqui detalhes adicionais do seu pedido..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  maxLength={200}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {customMessage.length}/200 caracteres
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={handleCall}
              disabled={!selectedOption || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Chamando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Chamar Garçom
                </div>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};