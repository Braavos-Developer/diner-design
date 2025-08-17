import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Badge } from '@/design/components/atoms/Badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, MenuItem, getItemById } from '@/mocks/menu';
import { useToast } from '@/hooks/use-toast';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    tags: [],
    allergens: [],
    preparationTime: 15,
    isNew: false,
    isBestSeller: false,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spicyLevel: undefined,
    calories: undefined,
    variations: [],
    extras: []
  });

  const [newTag, setNewTag] = useState('');
  const [newAllergen, setNewAllergen] = useState('');

  useEffect(() => {
    if (isEditing) {
      const product = getItemById(id!);
      if (product) {
        setFormData(product);
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (field: keyof MenuItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const addAllergen = () => {
    if (newAllergen.trim() && !formData.allergens?.includes(newAllergen.trim())) {
      setFormData(prev => ({
        ...prev,
        allergens: [...(prev.allergens || []), newAllergen.trim()]
      }));
      setNewAllergen('');
    }
  };

  const removeAllergen = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens?.filter(a => a !== allergen) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.category || !formData.price) {
      toast({
        title: "Erro de validação",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Mock save
    toast({
      title: isEditing ? "Produto atualizado" : "Produto criado",
      description: `${formData.name} foi ${isEditing ? 'atualizado' : 'criado'} com sucesso.`,
    });

    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditing ? 'Atualize as informações do produto' : 'Adicione um novo item ao menu'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Salmão Grelhado com Risotto"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Descreva os ingredientes e modo de preparo..."
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria *</Label>
                      <Select
                        value={formData.category || ''}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Preço (R$) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prepTime">Tempo de Preparo (min)</Label>
                      <Input
                        id="prepTime"
                        type="number"
                        value={formData.preparationTime || ''}
                        onChange={(e) => handleInputChange('preparationTime', parseInt(e.target.value) || 0)}
                        placeholder="15"
                      />
                    </div>

                    <div>
                      <Label htmlFor="calories">Calorias (opcional)</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={formData.calories || ''}
                        onChange={(e) => handleInputChange('calories', parseInt(e.target.value) || undefined)}
                        placeholder="300"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tags & Allergens */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tags e Alérgenos</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Ex: tradicional, gourmet..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="gap-2">
                          {tag}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Alérgenos</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newAllergen}
                        onChange={(e) => setNewAllergen(e.target.value)}
                        placeholder="Ex: glúten, lactose..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergen())}
                      />
                      <Button type="button" onClick={addAllergen} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergens?.map(allergen => (
                        <Badge key={allergen} variant="destructive" className="gap-2">
                          {allergen}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => removeAllergen(allergen)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Imagem do Produto</h3>
                <div className="space-y-4">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleInputChange('image', '')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg h-40 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Clique para adicionar imagem</p>
                      </div>
                    </div>
                  )}
                  <Input
                    placeholder="URL da imagem"
                    value={formData.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                  />
                </div>
              </Card>

              {/* Flags */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Configurações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isNew">Produto novo</Label>
                    <Switch
                      id="isNew"
                      checked={formData.isNew || false}
                      onCheckedChange={(checked) => handleInputChange('isNew', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isBestSeller">Mais vendido</Label>
                    <Switch
                      id="isBestSeller"
                      checked={formData.isBestSeller || false}
                      onCheckedChange={(checked) => handleInputChange('isBestSeller', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isVegetarian">Vegetariano</Label>
                    <Switch
                      id="isVegetarian"
                      checked={formData.isVegetarian || false}
                      onCheckedChange={(checked) => handleInputChange('isVegetarian', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isVegan">Vegano</Label>
                    <Switch
                      id="isVegan"
                      checked={formData.isVegan || false}
                      onCheckedChange={(checked) => handleInputChange('isVegan', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="isGlutenFree">Sem glúten</Label>
                    <Switch
                      id="isGlutenFree"
                      checked={formData.isGlutenFree || false}
                      onCheckedChange={(checked) => handleInputChange('isGlutenFree', checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="spicyLevel">Nível de Pimenta</Label>
                    <Select
                      value={formData.spicyLevel?.toString() || '0'}
                      onValueChange={(value) => handleInputChange('spicyLevel', value === '0' ? undefined : parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Sem pimenta</SelectItem>
                        <SelectItem value="1">🌶️ Leve</SelectItem>
                        <SelectItem value="2">🌶️🌶️ Médio</SelectItem>
                        <SelectItem value="3">🌶️🌶️🌶️ Forte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                <Button type="submit" variant="hero" className="w-full">
                  {isEditing ? 'Atualizar Produto' : 'Criar Produto'}
                </Button>
                <Link to="/admin/products" className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;