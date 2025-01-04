import { cn } from "@/lib/utils";
import { KeyboardEvent } from "react";

interface EditableTokenProps {
  value: string;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function EditableToken({
  value,
  className,
  inputRef,
  onKeyDown,
  onBlur,
}: EditableTokenProps) {
  return (
    <input
      ref={inputRef}
      type="text"
      className={cn(
        "h-9 px-3 rounded-full bg-primary text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-[200px] min-w-[50px]",
        className
      )}
      defaultValue={value}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      aria-label={`editing-${value}`}
    />
  );
}
