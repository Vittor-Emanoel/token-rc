import { generateRandomId } from "@/utils/generateRandomId";
import { useRef, useState } from "react";
import { Token } from "./types";

interface UseTokenControllerProps {
  tokens: Token[];
  onChangeValue?: (tokens: Token[]) => void;
  onInputChange?: (value: string) => void;
}

export function useTokenController({
  tokens,
  onChangeValue,
  onInputChange,
}: UseTokenControllerProps) {
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputChange?.(value);
  };

  const addToken = (value: string) => {
    if (value.trim() && !tokens.some((token) => token.value === value)) {
      const newToken = { id: generateRandomId(), value: value.trim() };
      onChangeValue?.([...tokens, newToken]);
    }
  };

  const removeToken = (id: string) => {
    onChangeValue?.(tokens.filter((token) => token.id !== id));
  };

  const updateToken = (id: string, newValue: string) => {
    if (newValue.trim()) {
      const updatedTokens = tokens.map((token) =>
        token.id === id ? { ...token, value: newValue } : token
      );
      onChangeValue?.(updatedTokens);
    }
  };

  const startEditing = (id: string) => {
    setEditingId(id);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 0);
  };

  const stopEditing = () => {
    setEditingId(null);
  };

  return {
    inputValue,
    editingId,
    editInputRef,
    handlers: {
      handleInputChange,
      addToken,
      removeToken,
      updateToken,
      startEditing,
      stopEditing,
    },
  };
}
