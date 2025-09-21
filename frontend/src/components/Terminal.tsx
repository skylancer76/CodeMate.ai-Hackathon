import { TerminalHeader } from './TerminalHeader';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { TerminalStatus } from './TerminalStatus';
import { useTerminal } from '../hooks/useTerminal';

export const Terminal = () => {
  const { lines, currentDirectory, stats, executeCommand, getAutoComplete } = useTerminal();

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-terminal-window rounded-lg overflow-hidden shadow-2xl border border-terminal-border">
        <TerminalHeader />
        
        <div className="h-96 flex flex-col">
          <TerminalOutput lines={lines} />
          <TerminalInput 
            currentDirectory={currentDirectory}
            onExecuteCommand={executeCommand}
            onGetAutoComplete={getAutoComplete}
          />
        </div>
        
        <TerminalStatus stats={stats} />
      </div>
    </div>
  );
};