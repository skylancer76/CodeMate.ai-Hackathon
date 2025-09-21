# Python Terminal Web App

A modern web-based terminal interface that connects to a Python backend for real command execution.

## Project Structure

```
├── backend/          # Python FastAPI backend
│   ├── main.py       # FastAPI server and endpoints
│   ├── command_processor.py  # Command execution logic
│   ├── commands_list.py     # Supported commands list
│   └── requirements.txt     # Python dependencies
└── frontend/         # React frontend
    ├── src/          # React source files
    ├── index.html    # HTML entry point
    └── package.json  # Node.js dependencies
```

## Quick Start

### 1. Start the Backend (Python)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start the Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

### 3. Open the Application

Navigate to `http://localhost:8080` in your browser.

## Features

- **Real Command Execution**: Commands are processed by the Python backend using your actual file system
- **Auto-completion**: Type and get suggestions for available commands
- **System Stats**: Real-time CPU, memory, and network usage
- **Modern UI**: Beautiful terminal interface with syntax highlighting
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Supported Commands

ls, cd, pwd, mkdir, rm, rmdir, touch, cat, echo, clear, mv, cp, head, tail, grep, find, whoami, date, ps, kill

## API Endpoints

- `POST /execute` - Execute a terminal command
- `GET /autocomplete?prefix=<prefix>` - Get command suggestions
- `GET /stats` - Get real-time system statistics

## Tech Stack

**Backend:**
- FastAPI (Python web framework)
- psutil (System and process utilities)

**Frontend:**
- React + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
