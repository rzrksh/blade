import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string; icon?: ReactNode };

interface Props<T extends string> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export const Segmented = <T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: Props<T>) => (
  <div
    role="tablist"
    aria-label={label}
    className={cn(
      "inline-flex rounded-lg border bg-muted p-1 gap-1",
      className,
    )}
  >
    {options.map((option) => {
      const selected = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={selected}
          onClick={() => onChange(option.value)}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors [&_svg]:size-4",
            selected
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.icon}
          {option.label}
        </button>
      );
    })}
  </div>
);
