# Tyeetale Terminal

A web-based terminal interface built with React and Python FastAPI. This project started as a hackathon idea and evolved into a functional terminal emulator that runs real commands on your system.

## What is this?

Basically, I wanted to create a terminal that looks cool and works in the browser. It connects to a Python backend that actually executes commands on your file system (with some safety restrictions). Think of it as a web-based terminal with a modern UI.

## Getting Started

### Backend Setup (Python)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will start on `http://localhost:8000`

### Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:8080`

### Usage

Just open `http://localhost:8080` in your browser and start typing commands!

## What Commands Work?

- `ls` - List files and directories
- `cd` - Change directory (supports `cd ..`)
- `pwd` - Show current directory
- `mkdir` - Create directories
- `rm` - Remove files
- `rmdir` - Remove empty directories
- `touch` - Create/update files
- `cat` - Display file contents
- `echo` - Print text
- `clear` - Clear the screen
- `mv` - Move/rename files
- `cp` - Copy files
- `head` - Show first 10 lines of a file
- `tail` - Show last 10 lines of a file
- `grep` - Search text in files
- `find` - Find files by name
- `whoami` - Show current user
- `date` - Show current date/time
- `ps` - List running processes
- `kill` - Terminate processes
- `help` - Show help message

## Technical Details

**Backend:**
- FastAPI for the API
- psutil for system monitoring
- Basic command parsing and execution

**Frontend:**
- React with TypeScript
- Tailwind CSS for styling
- Real-time system stats display
- Command autocomplete

## API Endpoints

- `POST /execute` - Run a command
- `GET /autocomplete?prefix=<text>` - Get command suggestions
- `GET /stats` - Get system stats (CPU, memory, network)
- `GET /health` - Health check

## Notes

- This runs actual commands on your system, so be careful
- Some commands have basic safety checks
- The UI shows real-time system stats
- Built for the CodeMate.ai hackathon

## Future Improvements

- Add more command support
- Better error handling
- Command history
- File upload/download
- Multiple terminal sessions
