import { useEffect, useRef } from 'react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export const TerminalOutput = ({ lines }: TerminalOutputProps) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const formatCommandLine = (content: string) => {
    const parts = content.split(' > ');
    if (parts.length >= 2) {
      const [prompt, ...commandParts] = parts;
      const commandLine = commandParts.join(' > ');
      const [command, ...args] = commandLine.split(' ');
      
      return (
        <>
          <span className="text-terminal-prompt">{prompt} {'>'}</span>
          <span className="text-terminal-command ml-2">{command}</span>
          {args.length > 0 && <span className="text-terminal-path ml-1">{args.join(' ')}</span>}
        </>
      );
    }
    return <span className="text-terminal-text">{content}</span>;
  };

  return (
    <div 
      ref={outputRef}
      className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-terminal-window scrollbar-thin scrollbar-track-transparent scrollbar-thumb-terminal-border"
    >
      {lines.map((line) => (
        <div key={line.id} className="mb-1 leading-relaxed">
          {line.type === 'command' ? (
            formatCommandLine(line.content)
          ) : (
            <span className={
              line.type === 'error' 
                ? 'text-destructive' 
                : 'text-terminal-text'
            }>
              {line.content}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};