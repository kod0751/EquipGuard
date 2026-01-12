import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border bg-background hover:bg-accent',
        ghost: 'hover:text-primary',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-destructive/90',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
