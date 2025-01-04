import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Token } from "../types";

interface TokenBadgeProps {
  token: Token;
  className?: string;
  onRemove: () => void;
  onStartEditing: () => void;
}

export function TokenBadge({
  token,
  className,
  onRemove,
  onStartEditing,
}: TokenBadgeProps) {
  return (
    <Badge
      className={cn(
        "h-9 flex items-center gap-2 rounded-full cursor-text",
        className
      )}
      onDoubleClick={onStartEditing}
    >
      {token.value}
      <button
        aria-label={`remove-${token.value}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <Cross2Icon />
      </button>
    </Badge>
  );
}
