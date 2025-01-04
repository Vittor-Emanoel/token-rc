import { Cross2Icon } from "@radix-ui/react-icons";
import { ClipboardEvent, KeyboardEvent, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";

export function App() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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

    if (e.key === "Backspace") {
      handleRemoveTokenOnBackspaceChange();
    }

    console.log(e.key);
    if (e.key === e.key) {
      return;
    }
  }

  function handlePasteTokens(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedContent = e.clipboardData.getData("text");

    const newTokens = pastedContent
      .split(/[,\s]+/)
      .filter((token) => token.trim());

    setTokens((currentTokens) => [...currentTokens, ...newTokens]);
  }

  function handleRemoveTokenOnBackspaceChange() {
    const newTokens = tokens.slice(0, -1);
    setTokens(newTokens);
  }

  //removing using index token
  function handleRemoveToken(tokenIndex: number) {
    console.log(tokenIndex);
    const newTokens = tokens.filter((_, index) => index !== tokenIndex);

    setTokens([...newTokens]);
  }

  return (
    <div className="w-full h-screen">
      <div className="w-[500px] min-h-32 mx-auto text-center mt-12 space-y-2">
        <header>
          <h1 className="text-2xl leading-relaxed">Token</h1>
        </header>

        {/*Container dos tokens */}
        <section className="w-full flex-wrap flex items-center border rounded-sm gap-1 px-2 py-1">
          {tokens.length > 0 &&
            tokens.map((token, index) => (
              <Badge
                key={`${token}-${index}`}
                className="h-9 flex items-center gap-2 rounded-full"
              >
                {token}
                <button
                  aria-label={`Remove ${token}`}
                  onClick={() => handleRemoveToken(index)}
                >
                  <Cross2Icon />
                </button>
              </Badge>
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
