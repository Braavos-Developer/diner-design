import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Botões primários com degradê horizontal Terracota → Âmbar
        default: 'bg-gradient-primary text-white shadow-brand hover:shadow-elegant hover:scale-[1.02] transform',
        
        // Botões secundários com Verde Musgo
        secondary: 'bg-success text-success-foreground shadow-sm hover:bg-success/80 hover:shadow-md',
        
        // Botão destrutivo usando Terracota mais intenso
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        
        // Outline com borda madeira
        outline: 'border border-wood/40 bg-background shadow-sm hover:bg-secondary hover:text-foreground hover:border-wood/60',
        
        // Ghost com hover âmbar
        ghost: 'hover:bg-accent/20 hover:text-accent-foreground',
        
        // Links com cor âmbar
        link: 'text-accent underline-offset-4 hover:underline hover:text-accent-dark',
        
        // Restaurant specific variants
        hero: 'bg-gradient-primary text-white shadow-brand hover:shadow-elegant hover:scale-105 transform',
        warm: 'bg-gradient-warm text-white shadow-md hover:shadow-brand hover:-translate-y-0.5',
        glass: 'glass-effect text-foreground hover:bg-secondary/60 hover:backdrop-blur-md',
        
        // Variantes específicas do restaurante
        terracota: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark',
        amber: 'bg-accent text-accent-foreground shadow-sm hover:bg-accent-dark',
        moss: 'bg-success text-success-foreground shadow-sm hover:bg-success/80',
        wood: 'bg-wood text-white shadow-sm hover:bg-wood-dark',
        
        // Estados de alerta
        success: 'bg-success text-success-foreground shadow-sm hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 rounded-lg px-10 text-base font-semibold',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }