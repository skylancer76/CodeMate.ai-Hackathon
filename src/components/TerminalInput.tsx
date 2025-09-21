import { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  currentDirectory: string;
  onExecuteCommand: (command: string) => void;
  onGetAutoComplete: (input: string) => string[];
}

export const TerminalInput = ({ 
  currentDirectory, 
  onExecuteCommand, 
  onGetAutoComplete 
}: TerminalInputProps) => {
  const [input, setInput] = useState('');
  const [ghostText, setGhostText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (input) {
      const suggestions = onGetAutoComplete(input);
      if (suggestions.length > 0) {
        const suggestion = suggestions[0];
        setGhostText(suggestion.slice(input.length));
      } else {
        setGhostText('');
      }
    } else {
      setGhostText('');
    }
  }, [input, onGetAutoComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onExecuteCommand(input);
      setInput('');
      setGhostText('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (ghostText) {
        setInput(input + ghostText);
        setGhostText('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="border-t border-terminal-border bg-terminal-window p-4">
      <div className="flex items-center font-mono text-sm relative">
        <span className="text-terminal-prompt mr-2">{currentDirectory} {'>'}</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-terminal-text w-full font-mono"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          {ghostText && (
            <span className="absolute left-0 text-terminal-ghost pointer-events-none font-mono">
              {input}<span className="opacity-50">{ghostText}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};