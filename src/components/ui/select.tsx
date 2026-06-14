import {
  forwardRef,
  type SelectHTMLAttributes,
  type InputHTMLAttributes,
} from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'h-9 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink-900 focus:border-tea-500 focus:outline-none focus:ring-2 focus:ring-tea-500/20',
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = 'Select';

export function Checkbox({
  className,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-700">
      <span className="relative inline-flex h-4 w-4">
        <input
          type="checkbox"
          className={cn(
            'peer h-4 w-4 appearance-none rounded border border-line bg-surface checked:border-tea-700 checked:bg-tea-700 focus:outline-none focus:ring-2 focus:ring-tea-500/30',
            className
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
      </span>
      {label}
    </label>
  );
}
