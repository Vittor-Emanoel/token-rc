import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { ClipboardEvent, KeyboardEvent } from "react";
import { InputTokenProps } from "../types";
import { useTokenController } from "../useTokenController";
import { EditableToken } from "./EditableToken";
import { TokenBadge } from "./TagBadge";

export function InputToken({
  onChangeValue,
  onInputChange,
  tokens,
  styles,
}: InputTokenProps) {
  const { inputValue, editingId, editInputRef, handlers } = useTokenController({
    tokens,
    onChangeValue,
    onInputChange,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlers.addToken(inputValue);
      handlers.handleInputChange("");
    }

    if (e.key === "Backspace" && inputValue === "") {
      const lastToken = tokens[tokens.length - 1];
      if (lastToken) {
        handlers.removeToken(lastToken.id);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedContent = e.clipboardData.getData("text");

    pastedContent
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean)
      .forEach((value) => {
        handlers.addToken(value);
      });
  };

  return (
    <section
      className={cn(
        "w-full flex-wrap flex items-center border rounded-sm gap-1 px-2 py-1 overflow-x-hidden",
        styles?.containerClassName
      )}
    >
      {tokens.map((token) => (
        <div key={token.id} className="flex items-center flex-wrap gap-2">
          {editingId === token.id ? (
            <EditableToken
              value={token.value}
              className={styles?.inputEditClassName}
              inputRef={editInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlers.updateToken(
                    token.id,
                    (e.target as HTMLInputElement).value
                  );
                  handlers.stopEditing();
                }
                if (e.key === "Escape") {
                  handlers.stopEditing();
                }
              }}
              onBlur={handlers.stopEditing}
            />
          ) : (
            <TokenBadge
              token={token}
              className={styles?.tagClassName}
              onRemove={() => handlers.removeToken(token.id)}
              onStartEditing={() => handlers.startEditing(token.id)}
            />
          )}
        </div>
      ))}

      <Input
        type="text"
        className={cn(
          "flex-1 w-full min-w-[50px] max-w-full",
          styles?.inputClassName
        )}
        value={inputValue}
        onChange={(e) => handlers.handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </section>
  );
}
