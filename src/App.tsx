import { useState } from "react";
import { InputToken } from "./components/Token";

export function App() {
  const [contacts, setContacts] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchContacts = (query: string) => {
    const allContacts = [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Brown",
      "Diana Prince",
      "Edward Elric",
    ];
    return allContacts.filter((contact) =>
      contact.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleInputChange = (value: string) => {
    if (value.trim()) {
      const results = fetchContacts(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (!contacts.includes(suggestion)) {
      setContacts((prev) => [...prev, suggestion]);
    }
    setSuggestions([]);
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-[500px] min-h-32 mx-auto text-center mt-12 space-y-2 px-3">
        <header>
          <h1 className="text-2xl leading-relaxed">Token</h1>
        </header>

        <InputToken
          tokens={contacts}
          onChangeValue={(tokens) => setContacts(tokens)}
          onInputChange={handleInputChange}
        />

        {suggestions.length > 0 && (
          <ul className="bg-white border rounded shadow-md mt-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
