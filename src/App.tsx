import { Cross2Icon } from "@radix-ui/react-icons";
import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";

export function App() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  function handleAddToken(token: string) {
    if (token.trim() && !tokens.includes(token)) {
      setTokens((state) => [...state, token]);
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

    setTokens((currentTokens) => [...currentTokens, ...newTokens]);
  }

  function handleRemoveTokenOnBackspaceChange() {
    if (tokens.length > 0) {
      const newTokens = tokens.slice(0, -1);
      setTokens(newTokens);
    }
  }

  function handleRemoveToken(tokenIndex: number) {
    const newTokens = tokens.filter((_, index) => index !== tokenIndex);
    setTokens(newTokens);
  }

  function handleStartEditing(index: number) {
    setEditingIndex(index);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select(); // Seleciona todo o texto
      }
    }, 0);
  }

  function handleEditKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
      const newTokens = [...tokens];
      newTokens[index] = (e.target as HTMLInputElement).value;
      setTokens(newTokens);
      setEditingIndex(null);
    }

    if (e.key === "Escape") {
      setEditingIndex(null);
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-[500px] min-h-32 mx-auto text-center mt-12 space-y-2">
        <header>
          <h1 className="text-2xl leading-relaxed">Token</h1>
        </header>

        <section className="w-full flex-wrap flex items-center border rounded-sm gap-1 px-2 py-1">
          {tokens.length > 0 &&
            tokens.map((token, index) => (
              <div key={`${token}-${index}`} className="flex items-center">
                {editingIndex === index ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    className="h-9 px-3 rounded-full bg-primary text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto "
                    defaultValue={token}
                    onKeyDown={(e) => handleEditKeyDown(e, index)}
                    onBlur={() => setEditingIndex(null)}
                    aria-label={`editing-${token}`}
                    style={{ width: `${Math.max(50, token.length * 10)}px` }}
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
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTokenOnSubmit}
            onPaste={handlePasteTokens}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
