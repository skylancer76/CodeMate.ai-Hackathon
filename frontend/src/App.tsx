import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isAutocompleting, setIsAutocompleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSuggestions = async (prefix: string) => {
    if (!prefix) {
      setSuggestion(null);
      return;
    }
    try {
      const res = await fetch(`/autocomplete?prefix=${encodeURIComponent(prefix)}`);
      const data = await res.json();
      const first = data.suggestions?.[0];
      if (first && first.toLowerCase().startsWith(prefix.toLowerCase()) && first.length > prefix.length) {
        setSuggestion(first);
        setIsAutocompleting(true);
      } else {
        setSuggestion(null);
        setIsAutocompleting(false);
      }
    } catch (err) {
      console.error("Suggestion fetch failed", err);
    }
  };

  const handleChange = (value: string) => {
    setCurrentInput(value);
    fetchSuggestions(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHistory((prev) => [...prev, currentInput]);
      setCurrentInput("");
      setSuggestion(null);
      return;
    }

    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
      e.preventDefault();
      setCurrentInput(suggestion);
      setSuggestion(null);
      setIsAutocompleting(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {history.map((cmd, idx) => (
          <div key={idx} className="terminal-line">
            <span className="prompt">$</span> {cmd}
          </div>
        ))}
      </div>

      <div className="terminal-input-area">
        <span className="prompt">$</span>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="off"
            spellCheck="false"
          />
          {suggestion && (
            <span className="ghost-suggestion">
              {suggestion.slice(currentInput.length)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
