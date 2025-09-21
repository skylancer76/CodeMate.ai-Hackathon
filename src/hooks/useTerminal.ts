import { useState, useCallback, useRef, useEffect } from 'react';

const COMMANDS = [
  "ls", "cd", "pwd", "mkdir", "rm", "rmdir", "touch", "cat", "echo",
  "clear", "mv", "cp", "head", "tail", "grep", "find",
  "whoami", "date", "ps", "kill"
];

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface SystemStats {
  cpu: number;
  memory: number;
  networkUp: number;
  networkDown: number;
}

export const useTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'Welcome to Tyeetale Terminal v1.0',
      timestamp: new Date()
    },
    {
      id: '2', 
      type: 'output',
      content: 'Type "help" to see available commands.',
      timestamp: new Date()
    }
  ]);
  
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [stats, setStats] = useState<SystemStats>({
    cpu: 17,
    memory: 33,
    networkUp: 1.0,
    networkDown: 1.0
  });
  
  const lineIdCounter = useRef(3);

  const addLine = useCallback((content: string, type: TerminalLine['type'] = 'output') => {
    const newLine: TerminalLine = {
      id: (lineIdCounter.current++).toString(),
      type,
      content,
      timestamp: new Date()
    };
    setLines(prev => [...prev, newLine]);
  }, []);

  const executeCommand = useCallback((input: string) => {
    if (!input.trim()) return;
    
    // Add command to output
    addLine(`${currentDirectory} > ${input}`, 'command');
    
    const [command, ...args] = input.trim().split(' ');
    
    switch (command.toLowerCase()) {
      case 'clear':
        setLines([]);
        break;
        
      case 'help':
        addLine('Available commands:');
        addLine(COMMANDS.join(', '));
        break;
        
      case 'ls':
        addLine('Documents    Downloads    Desktop');
        addLine('Pictures     Music       Videos');
        addLine('Projects     web_development');
        break;
        
      case 'pwd':
        addLine(currentDirectory === '~' ? '/Users/developer' : `/Users/developer/${currentDirectory.replace('~/', '')}`);
        break;
        
      case 'cd':
        if (args.length === 0) {
          setCurrentDirectory('~');
          addLine('Changed directory to home');
        } else {
          const target = args[0];
          if (target === '..' && currentDirectory !== '~') {
            setCurrentDirectory('~');
            addLine('Changed directory to parent');
          } else if (target === 'web_development' || target.includes('web')) {
            setCurrentDirectory('~/web_development');
            addLine('Changed directory to web_development');
          } else {
            setCurrentDirectory(`~/${target}`);
            addLine(`Changed directory to ${target}`);
          }
        }
        break;
        
      case 'whoami':
        addLine('developer');
        break;
        
      case 'date':
        addLine(new Date().toString());
        break;
        
      case 'echo':
        addLine(args.join(' '));
        break;
        
      case 'mkdir':
        if (args.length === 0) {
          addLine('Usage: mkdir <directory>', 'error');
        } else {
          addLine(`Directory '${args[0]}' created`);
        }
        break;
        
      case 'touch':
        if (args.length === 0) {
          addLine('Usage: touch <filename>', 'error');
        } else {
          addLine(`File '${args[0]}' created`);
        }
        break;
        
      case 'ps':
        addLine('PID    COMMAND');
        addLine('1234   terminal');
        addLine('5678   browser');
        addLine('9012   code_editor');
        break;
        
      default:
        if (COMMANDS.includes(command)) {
          addLine(`${command}: command simulated successfully`);
        } else {
          addLine(`${command}: command not found`, 'error');
        }
        break;
    }
  }, [currentDirectory, addLine]);

  const getAutoComplete = useCallback((input: string): string[] => {
    if (!input.trim()) return [];
    
    const matches = COMMANDS.filter(cmd => cmd.startsWith(input.toLowerCase()));
    return matches;
  }, []);

  // Simulate system stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(80, prev.memory + (Math.random() - 0.5) * 5)),
        networkUp: Math.max(0.1, prev.networkUp + (Math.random() - 0.5) * 2),
        networkDown: Math.max(0.1, prev.networkDown + (Math.random() - 0.5) * 2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    lines,
    currentDirectory,
    stats,
    executeCommand,
    getAutoComplete,
    addLine
  };
};