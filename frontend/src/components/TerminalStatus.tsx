interface SystemStats {
  cpu: number;
  memory: number;
  networkUp: number;
  networkDown: number;
}

interface TerminalStatusProps {
  stats: SystemStats;
}

export const TerminalStatus = ({ stats }: TerminalStatusProps) => {
  return (
    <div className="bg-status-bg px-4 py-2 flex items-center justify-between text-xs font-mono border-t border-terminal-border">
      <div className="flex items-center gap-4">
        {/* Memory Usage */}
        <div className="flex items-center gap-2">
          <span className="text-terminal-text-dim">💾</span>
          <span className="text-status-memory font-semibold">{Math.round(stats.memory)}GB</span>
          <div className="w-16 h-1.5 bg-terminal-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-status-memory to-status-cpu transition-all duration-500"
              style={{ width: `${Math.min(100, stats.memory * 1.2)}%` }}
            />
          </div>
        </div>

        {/* CPU Usage */}
        <div className="flex items-center gap-2">
          <span className="text-terminal-text-dim">🔧</span>
          <span className="text-status-cpu font-semibold">{Math.round(stats.cpu)}%</span>
          <div className="flex items-end gap-px h-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="w-0.5 bg-status-cpu transition-all duration-300"
                style={{ 
                  height: `${Math.max(2, (stats.cpu / 100) * 12 + Math.sin(Date.now() / 200 + i) * 2)}px`,
                  opacity: i < (stats.cpu / 100) * 8 ? 1 : 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-terminal-text-dim">📤</span>
          <span className="text-status-network">{stats.networkUp.toFixed(1)} kB↑</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-terminal-text-dim">📥</span>
          <span className="text-status-network">{stats.networkDown.toFixed(1)} kB↓</span>
        </div>
      </div>
    </div>
  );
};