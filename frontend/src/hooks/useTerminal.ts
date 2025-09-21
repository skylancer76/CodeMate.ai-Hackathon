import { useState, useCallback, useRef, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
    cpu: 0,
    memory: 0,
    networkUp: 0,
    networkDown: 0
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

  const executeCommand = useCallback(async (input: string) => {
    if (!input.trim()) return;
    
    // Add command to output
    addLine(`${currentDirectory} > ${input}`, 'command');
    
    try {
      const response = await fetch(`${API_BASE}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: input.trim() }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.output === '<CLEAR_SCREEN>') {
          setLines([]);
        } else {
          addLine(data.output);
          // Update current directory if it's a cd command
          if (input.trim().startsWith('cd')) {
            // Get updated directory from pwd
            const pwdResponse = await fetch(`${API_BASE}/execute`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ command: 'pwd' }),
            });
            if (pwdResponse.ok) {
              const pwdData = await pwdResponse.json();
              setCurrentDirectory(pwdData.output);
            }
          }
        }
      } else {
        addLine('Error: Could not connect to backend server', 'error');
      }
    } catch (error) {
      console.error('Command execution error:', error);
      addLine('Error: Backend server is not running. Please start the Python backend.', 'error');
    }
  }, [currentDirectory, addLine]);

  const getAutoComplete = useCallback(async (input: string): Promise<string[]> => {
    if (!input.trim()) return [];
    
    try {
      const response = await fetch(`${API_BASE}/autocomplete?prefix=${encodeURIComponent(input.trim())}`);
      if (response.ok) {
        const data = await response.json();
        return data.suggestions || [];
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
    }
    return [];
  }, []);

  // Fetch system stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            cpu: data.cpu,
            memory: data.mem,
            networkUp: data.net_up / (1024 * 1024), // Convert to MB
            networkDown: data.net_down / (1024 * 1024) // Convert to MB
          });
        }
      } catch (error) {
        // Fallback to simulated stats if backend is not available
        setStats(prev => ({
          cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 8)),
          memory: Math.max(20, Math.min(80, prev.memory + (Math.random() - 0.5) * 3)),
          networkUp: Math.max(0.1, prev.networkUp + (Math.random() - 0.5) * 1.5),
          networkDown: Math.max(0.1, prev.networkDown + (Math.random() - 0.5) * 1.5)
        }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
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