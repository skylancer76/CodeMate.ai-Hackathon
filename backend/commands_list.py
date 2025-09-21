# List of supported terminal commands (30+ popular OS commands)
COMMANDS = [
    # File and Directory Operations
    "ls", "cd", "pwd", "mkdir", "rm", "rmdir", "touch", "cat", "echo",
    "mv", "cp", "ln", "chmod", "chown", "file", "stat",
    
    # Text Processing
    "head", "tail", "grep", "sed", "awk", "sort", "uniq", "wc", "cut",
    
    # System Information
    "whoami", "date", "uptime", "uname", "df", "du", "free", "top", "ps",
    "kill", "killall", "jobs", "bg", "fg",
    
    # Network and Utilities
    "ping", "curl", "wget", "ssh", "scp", "tar", "zip", "unzip",
    
    # Terminal Control
    "clear", "history", "alias", "export", "env", "which", "whereis",
    
    # Help and Documentation
    "help", "man", "info"
]

# Command descriptions for help
COMMAND_HELP = {
    # File and Directory Operations
    "ls": "List directory contents (use -la for detailed view)",
    "cd": "Change directory (cd .. to go up, cd ~ for home)",
    "pwd": "Print working directory",
    "mkdir": "Create a new directory (mkdir -p for nested dirs)",
    "rm": "Remove a file (rm -rf for recursive force)",
    "rmdir": "Remove an empty directory",
    "touch": "Create or update a file timestamp",
    "cat": "Display file contents",
    "echo": "Print text to terminal",
    "mv": "Move or rename files/directories",
    "cp": "Copy files (cp -r for directories)",
    "ln": "Create symbolic or hard links",
    "chmod": "Change file permissions",
    "chown": "Change file ownership",
    "file": "Determine file type",
    "stat": "Display file or filesystem status",
    
    # Text Processing
    "head": "Show first 10 lines of a file",
    "tail": "Show last 10 lines of a file",
    "grep": "Search for text patterns in files",
    "sed": "Stream editor for filtering and transforming text",
    "awk": "Pattern scanning and processing language",
    "sort": "Sort lines of text files",
    "uniq": "Report or omit repeated lines",
    "wc": "Print word, line, and byte counts",
    "cut": "Remove sections from each line of files",
    
    # System Information
    "whoami": "Show current username",
    "date": "Show current date and time",
    "uptime": "Show system uptime and load",
    "uname": "Show system information",
    "df": "Show disk space usage",
    "du": "Show directory space usage",
    "free": "Show memory usage",
    "top": "Show running processes (interactive)",
    "ps": "Show running processes",
    "kill": "Terminate a process by PID",
    "killall": "Terminate processes by name",
    "jobs": "Show active jobs",
    "bg": "Run job in background",
    "fg": "Bring job to foreground",
    
    # Network and Utilities
    "ping": "Test network connectivity",
    "curl": "Transfer data from/to servers",
    "wget": "Download files from the web",
    "ssh": "Secure shell remote login",
    "scp": "Secure copy files over network",
    "tar": "Archive files (tar -czf to compress)",
    "zip": "Create zip archives",
    "unzip": "Extract zip archives",
    
    # Terminal Control
    "clear": "Clear the terminal screen",
    "history": "Show command history",
    "alias": "Create command aliases",
    "export": "Set environment variables",
    "env": "Show environment variables",
    "which": "Locate a command",
    "whereis": "Locate binary, source, and manual files",
    
    # Help and Documentation
    "help": "Show this help message",
    "man": "Show manual pages",
    "info": "Show info documentation"
}