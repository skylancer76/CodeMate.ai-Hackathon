import { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  currentDirectory: string;
  onExecuteCommand: (command: string) => void;
  onGetAutoComplete: (input: string) => Promise<string[]>;
}

export const TerminalInput = ({ 
  currentDirectory, 
  onExecuteCommand, 
  onGetAutoComplete 
}: TerminalInputProps) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = async (value: string) => {
    setInput(value);
    
    if (value.trim()) {
      const suggestions = await onGetAutoComplete(value.trim());
      setSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && suggestions[selectedSuggestion]) {
        setInput(suggestions[selectedSuggestion]);
        setShowSuggestions(false);
      } else if (input.trim()) {
        onExecuteCommand(input);
        setInput('');
        setShowSuggestions(false);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (showSuggestions && suggestions[selectedSuggestion]) {
        setInput(suggestions[selectedSuggestion]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion(prev => (prev + 1) % suggestions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion(prev => prev === 0 ? suggestions.length - 1 : prev - 1);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative border-t border-terminal-border bg-terminal-window">
      <div className="flex items-center p-4 font-mono text-sm">
        <span className="text-terminal-prompt mr-2">{currentDirectory} {'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal-text outline-none caret-terminal-cursor"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      
      {showSuggestions && (
        <div className="absolute bottom-full left-0 w-full bg-terminal-window border border-terminal-border rounded-t-lg max-h-32 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-4 py-2 font-mono text-sm cursor-pointer ${
                index === selectedSuggestion
                  ? 'bg-terminal-highlight text-terminal-text'
                  : 'text-terminal-text hover:bg-terminal-highlight/50'
              }`}
              onClick={() => {
                setInput(suggestion);
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};