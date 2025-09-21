export const TerminalHeader = () => {
  return (
    <div className="bg-terminal-titlebar px-4 py-3 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-dot-red"></div>
        <div className="w-3 h-3 rounded-full bg-dot-yellow"></div>
        <div className="w-3 h-3 rounded-full bg-dot-green"></div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-terminal-text text-sm font-medium">tyeetale</span>
      </div>
    </div>
  );
};