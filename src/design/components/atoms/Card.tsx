import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border',
        elevated: 'shadow-md hover:shadow-elegant border-wood/20',
        glass: 'glass-effect border-wood/30',
        warm: 'bg-gradient-subtle border-primary/20 shadow-sm',
        interactive: 'hover-lift cursor-pointer hover:shadow-brand border-wood/20',
        brand: 'border-primary/30 bg-primary/5 shadow-sm',
        
        // Variantes específicas do restaurante
        terracota: 'border-primary/30 bg-primary/10 shadow-brand/50',
        amber: 'border-accent/40 bg-accent/10 shadow-sm',
        moss: 'border-success/30 bg-success/10 shadow-sm',
        wood: 'border-wood/40 bg-wood/5 shadow-sm',
        elegant: 'border-wood/20 bg-gradient-subtle shadow-elegant'
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      },
      radius: {
        default: 'rounded-lg',
        md: 'rounded-md',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        soft: 'rounded-3xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default'
    }
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, radius, className }))}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }