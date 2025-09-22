import React, { useState, useRef, useEffect } from 'react';
import './App.css';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
}

interface SystemStats {
  cpu: number;
  memory: number;
  networkUp: number;
  networkDown: number;
}

const API_BASE = import.meta.env.VITE_API_URL || 'https://codemateai-hackathon-production.up.railway.app';

const App: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'Welcome to Tyeetale Terminal v1.0'
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" to see available commands.'
    },
    {
      id: '3',
      type: 'output',
      content: `Backend URL: ${API_BASE}`
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState<number>(-1);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [stats, setStats] = useState<SystemStats>({
    cpu: 17,
    memory: 25,
    networkUp: 1.8,
    networkDown: 0.1
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineIdCounter = useRef(4);

  const addLine = (content: string, type: TerminalLine['type'] = 'output') => {
    const newLine: TerminalLine = {
      id: (lineIdCounter.current++).toString(),
      type,
      content
    };
    setLines(prev => [...prev, newLine]);
  };

  const executeCommand = async (input: string) => {
    if (!input.trim()) return;

    // Add command to output
    addLine(`${currentDirectory} > ${input}`, 'command');

    try {
      console.log('Attempting to connect to:', `${API_BASE}/execute`);
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
        addLine(`Error: Backend server returned status ${response.status}. Check your Railway backend URL: ${API_BASE}`, 'error');
      }
    } catch (error) {
      console.error('Command execution error:', error);
      addLine(`Error: ${error.message}. Check your Railway backend URL: ${API_BASE}`, 'error');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setSuggestions([]);
      setSelectedSuggestionIdx(-1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const chosen = selectedSuggestionIdx >= 0 ? suggestions[selectedSuggestionIdx] : suggestions[0];
        setCurrentInput(chosen + ' ');
        setSuggestions([]);
        setSelectedSuggestionIdx(-1);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestionIdx((prev) => (prev + 1) % suggestions.length);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      }
      return;
    }
  };

  // Autocomplete fetch
  useEffect(() => {
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      const trimmed = currentInput.trim();
      if (!trimmed) {
        setSuggestions([]);
        setSelectedSuggestionIdx(-1);
        return;
      }
      try {
        const url = `${API_BASE}/autocomplete?prefix=${encodeURIComponent(trimmed)}`;
        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setSelectedSuggestionIdx(-1);
        }
      } catch (_err) {
        // ignore
      }
    };

    const t = setTimeout(fetchSuggestions, 120);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [currentInput]);

  // Fetch system stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            cpu: data.cpu,
            memory: data.mem,
            networkUp: data.net_up / (1024 * 1024),
            networkDown: data.net_down / (1024 * 1024)
          });
        }
      } catch (error) {
        // Use simulated stats if backend is not available
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount and test connection
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Test backend connection on mount
    const testConnection = async () => {
      try {
        console.log('Testing connection to:', `${API_BASE}/test`);
        const response = await fetch(`${API_BASE}/test`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
          const data = await response.json();
          addLine(`✅ Backend connected: ${data.message}`, 'output');
        } else {
          addLine(`❌ Backend connection failed: Status ${response.status} - ${response.statusText}`, 'error');
        }
      } catch (error) {
        console.error('Connection test error:', error);
        addLine(`❌ Backend connection failed: ${error.message}`, 'error');
        addLine(`🔗 Trying to connect to: ${API_BASE}`, 'output');
      }
    };
    
    testConnection();
  }, []);

  return (
    <div className="terminal-window">
      {/* Title Bar */}
      <div className="terminal-header">
        <div className="window-controls">
          <button className="control-btn close"></button>
          <button className="control-btn minimize"></button>
          <button className="control-btn maximize"></button>
        </div>
        <div className="terminal-title">tyeetale</div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-content" ref={contentRef}>
        {lines.map((line) => (
          <div key={line.id} className={`terminal-line ${line.type}`}>
            {line.content}
          </div>
        ))}
        
        {/* Input Area */}
        <div className="terminal-input-area">
          <span className="prompt">{currentDirectory}</span>
          <span className="prompt-arrow">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command..."
            autoComplete="off"
            spellCheck="false"
          />

          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '48px',
              left: '0',
              background: '#ffffff',
              border: '1px solid #000',
              borderRadius: '6px',
              padding: '6px 8px',
              maxHeight: '160px',
              overflowY: 'auto',
              minWidth: '240px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
            }}>
              {suggestions.map((s, idx) => (
                <div
                  key={s + idx}
                  onMouseDown={() => {
                    setCurrentInput(s + ' ');
                    setSuggestions([]);
                    setSelectedSuggestionIdx(-1);
                  }}
                  style={{
                    padding: '6px 4px',
                    cursor: 'pointer',
                    background: idx === selectedSuggestionIdx ? '#e6f0ff' : 'transparent',
                    color: '#000'
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="terminal-status">
        <div className="status-item">
          <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
          <span className="status-value">{stats.memory.toFixed(0)}%</span>
        </div>
        
        <div className="status-item">
          <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="status-value">{stats.cpu.toFixed(0)}%</span>
        </div>
        
        <div className="status-item">
          <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <div className="status-item">
          <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zm4.5-9H2.5C1.67 2 1 2.67 1 3.5v17C1 21.33 1.67 22 2.5 22h19c.83 0 1.5-.67 1.5-1.5v-17C23 2.67 22.33 2 21.5 2zM21 20H3V4h18v16z"/>
          </svg>
          <span className="status-value">{stats.networkDown.toFixed(1)} kB ↓</span>
        </div>
        
        <div className="status-item">
          <svg className="status-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zm4.5-9H2.5C1.67 2 1 2.67 1 3.5v17C1 21.33 1.67 22 2.5 22h19c.83 0 1.5-.67 1.5-1.5v-17C23 2.67 22.33 2 21.5 2zM21 20H3V4h18v16z"/>
          </svg>
          <span className="status-value">{stats.networkUp.toFixed(1)} kB ↑</span>
        </div>
      </div>
    </div>
  );
};

export default App;