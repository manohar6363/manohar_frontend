"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import type { InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FloatingLabelInputProps extends InputProps {
  label: string;
  id: string; // id is required for label's htmlFor
  icon?: React.ReactNode;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, icon, type, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <Input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            'peer h-12 pt-4',
            icon ? 'pl-10' : 'pl-4',
            className
          )}
          placeholder=" " // This is crucial for the :placeholder-shown selector
          {...props}
        />
        <Label
          htmlFor={id}
          className={cn(
            "absolute text-base text-muted-foreground duration-300 transform -translate-y-1/2 top-1/2 origin-[0] bg-background px-1 transition-all",
            "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2",
            "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-4",
            icon ? "left-9" : "left-3"
          )}
        >
          {label}
        </Label>
      </div>
    );
  }
);
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingLabelInput };
