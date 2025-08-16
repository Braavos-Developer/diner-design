import React from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/mocks/menu';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className
}) => {
  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
                'border border-border',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-background hover:bg-muted hover:border-primary/30'
              )}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'group relative flex flex-col items-center gap-3 p-4 rounded-xl text-center transition-all duration-200',
                'border border-border hover:shadow-md',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                  : 'bg-background hover:bg-muted hover:border-primary/30 hover:scale-102'
              )}
            >
              {/* Icon */}
              <div className={cn(
                'text-3xl transition-transform duration-200',
                activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'
              )}>
                {category.icon}
              </div>
              
              {/* Title */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm leading-tight">
                  {category.name}
                </h3>
                {category.description && (
                  <p className={cn(
                    'text-xs opacity-80 line-clamp-2',
                    activeCategory === category.id 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  )}>
                    {category.description}
                  </p>
                )}
              </div>

              {/* Active indicator */}
              {activeCategory === category.id && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};