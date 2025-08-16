import React from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/mocks/menu';
import { Clock, Flame, Leaf, Award } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

const getSpicyIcon = (level?: number) => {
  if (!level) return null;
  return Array.from({ length: level }, (_, i) => (
    <Flame key={i} className="w-3 h-3 text-destructive fill-current" />
  ));
};

export const ProductCard: React.FC<ProductCardProps> = ({ 
  item, 
  onSelect, 
  className 
}) => {
  return (
    <Card 
      variant="interactive" 
      radius="xl" 
      className={cn('group overflow-hidden', className)}
      onClick={() => onSelect(item)}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {item.isNew && (
            <Badge variant="new" size="sm">
              Novo
            </Badge>
          )}
          {item.isBestSeller && (
            <Badge variant="bestseller" size="sm">
              <Award className="w-3 h-3 mr-1" />
              Mais Vendido
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="default" size="lg" className="font-bold">
            {formatPrice(item.price)}
          </Badge>
        </div>

        {/* Dietary Badges */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {item.isVegetarian && (
            <Badge variant="vegetarian" size="sm">
              <Leaf className="w-3 h-3" />
            </Badge>
          )}
          {item.isVegan && (
            <Badge variant="vegan" size="sm">
              Vegano
            </Badge>
          )}
          {item.isGlutenFree && (
            <Badge variant="glutenfree" size="sm">
              Sem Glúten
            </Badge>
          )}
        </div>

        {/* Spicy Level */}
        {item.spicyLevel && (
          <div className="absolute bottom-3 right-3 flex gap-0.5">
            {getSpicyIcon(item.spicyLevel)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Prep Time */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight text-balance">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{item.preparationTime}min</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 text-balance">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" size="sm" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" size="sm" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button 
          variant="hero" 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
        >
          Ver Detalhes
        </Button>
      </div>
    </Card>
  );
};