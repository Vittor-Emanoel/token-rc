import { Cross2Icon } from "@radix-ui/react-icons";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface IInputTokenProps {
  onChangeValue?: (tokens: string[]) => void;
  tokens: string[];
  onInputChange?: (value: string) => void;
}

export const InputToken = ({
  onChangeValue,
  onInputChange,
  tokens,
}: IInputTokenProps) => {
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    onInputChange?.(value);
  }

  function handleAddToken(token: string) {
    if (token.trim() && !tokens.includes(token)) {
      const updatedTokens = [...tokens, token];
      onChangeValue?.(updatedTokens);
    }
  }

  function handleAddTokenOnSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddToken(inputValue);
      setInputValue("");
    }

    if (e.key === "Backspace" && inputValue === "") {
      handleRemoveTokenOnBackspaceChange();
    }
  }

  function handlePasteTokens(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedContent = e.clipboardData.getData("text");
    const newTokens = pastedContent
      .split(/[,\s]+/)
      .filter((token) => token.trim())
      .filter((token) => !tokens.includes(token));

    if (newTokens.length > 0) {
      const updatedTokens = [...tokens, ...newTokens];
      onChangeValue?.(updatedTokens);
    }
  }

  function handleRemoveTokenOnBackspaceChange() {
    if (tokens.length > 0) {
      const updatedTokens = tokens.slice(0, -1);
      onChangeValue?.(updatedTokens);
    }
  }

  function handleRemoveToken(tokenIndex: number) {
    const updatedTokens = tokens.filter((_, index) => index !== tokenIndex);
    onChangeValue?.(updatedTokens);
  }

  function handleStartEditing(index: number) {
    setEditingIndex(index);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 0);
  }

  function handleEditKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
      const updatedTokens = [...tokens];
      updatedTokens[index] = (e.target as HTMLInputElement).value;
      onChangeValue?.(updatedTokens);
      setEditingIndex(null);
    }

    if (e.key === "Escape") {
      setEditingIndex(null);
    }
  }

  return (
    <section className="w-full flex-wrap flex items-center border rounded-sm gap-1 px-2 py-1">
      {tokens.map((token, index) => (
        <div key={`${token}-${index}`} className="flex items-center">
          {editingIndex === index ? (
            <input
              ref={editInputRef}
              type="text"
              className="h-9 px-3 rounded-full bg-primary text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto min-w-[50px] max-w-[200px]"
              defaultValue={token}
              onKeyDown={(e) => handleEditKeyDown(e, index)}
              onBlur={() => setEditingIndex(null)}
              aria-label={`editing-${token}`}
            />
          ) : (
            <Badge
              className="h-9 flex items-center gap-2 rounded-full cursor-text"
              onDoubleClick={() => handleStartEditing(index)}
            >
              {token}
              <button
                aria-label={`remove-${token}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveToken(index);
                }}
              >
                <Cross2Icon />
              </button>
            </Badge>
          )}
        </div>
      ))}

      <Input
        type="text"
        className="flex-1"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleAddTokenOnSubmit}
        onPaste={handlePasteTokens}
      />
    </section>
  );
};
