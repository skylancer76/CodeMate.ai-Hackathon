# 🖥️ Tyeetale Terminal

A modern web-based terminal emulator that brings the power of command-line interface to your browser. Built for the CodeMate.ai Hackathon with React, TypeScript, and Python FastAPI.

## 🌟 Features

- **🖥️ Full Terminal Experience**: Interactive command-line interface with familiar Unix commands
- **📊 Real-time System Monitoring**: Live CPU, memory, and network usage statistics
- **⚡ Smart Autocomplete**: Intelligent command suggestions as you type
- **📂 File System Operations**: Navigate, create, delete, and manage files and directories
- **🎨 Modern UI**: Clean, responsive terminal interface with syntax highlighting
- **🚀 Fast & Lightweight**: Built with modern web technologies for optimal performance

## 🔧 Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `ls` | List directory contents | `ls -la` |
| `cd` | Change directory | `cd /home/user` |
| `pwd` | Print working directory | `pwd` |
| `mkdir` | Create directory | `mkdir newfolder` |
| `rm` | Remove files/directories | `rm file.txt` |
| `cp` | Copy files | `cp source.txt dest.txt` |
| `mv` | Move/rename files | `mv old.txt new.txt` |
| `cat` | Display file contents | `cat README.md` |
| `touch` | Create empty file | `touch newfile.txt` |
| `echo` | Display text | `echo "Hello World"` |
| `clear` | Clear terminal screen | `clear` |
| `help` | Show available commands | `help` |
| `stats` | Show system statistics | `stats` |
| `whoami` | Display current user | `whoami` |
| `date` | Show current date/time | `date` |

## 🚀 Live Demo

Experience Tyeetale Terminal: [https://code-mate-ai-hackathon.vercel.app](https://code-mate-ai-hackathon.vercel.app)

## 📦 Installation & Setup

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/skylancer76/CodeMate.ai-Hackathon.git
   cd CodeMate.ai-Hackathon
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🏗️ Project Architecture

```
tyeetale-terminal/
├── 🐍 Backend (Python FastAPI)
│   ├── main.py              # FastAPI application entry point
│   ├── command_processor.py # Core command handling logic
│   ├── commands_list.py     # Available commands registry
│   └── requirements.txt     # Python dependencies
├── ⚛️ Frontend (React TypeScript)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── styles/         # CSS and styling
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite configuration
└── 🚀 Deployment
    ├── Procfile            # Heroku deployment
    ├── railway.toml        # Railway deployment
    └── DEPLOYMENT.md       # Deployment guide
```

## 🔌 API Endpoints

### Core Endpoints
- **POST `/execute`** - Execute terminal commands
  ```json
  {
    "command": "ls -la"
  }
  ```

- **GET `/autocomplete?prefix=<command>`** - Get command suggestions
  ```json
  {
    "suggestions": ["ls", "ln", "less"]
  }
  ```

- **GET `/stats`** - Retrieve system statistics
  ```json
  {
    "memory_percent": 65.2,
    "cpu_percent": 12.8,
    "disk_usage": "45.3 GB used"
  }
  ```

## 🚀 Deployment Options

### 🔧 Option 1: Railway (Recommended)
```bash
# Connect your GitHub repo to Railway
# Railway auto-detects and deploys both frontend and backend
```

### 🔧 Option 2: Separate Hosting
- **Backend**: Railway, Render, or Heroku
- **Frontend**: Vercel, Netlify

### 🔧 Option 3: Docker
```yaml
# docker-compose.yml included for containerized deployment
docker-compose up -d
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern, fast web framework for Python
- **uvicorn** - ASGI server implementation
- **psutil** - System and process utilities
- **pydantic** - Data validation using Python type hints

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with flexbox and grid

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all commands work cross-platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**skylancer76** - *CodeMate.ai Hackathon Project*

## 🙏 Acknowledgments

- Built for the **CodeMate.ai Hackathon**
- Inspired by classic Unix terminals
- Thanks to the open-source community for the amazing tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/skylancer76/CodeMate.ai-Hackathon/issues)
- **Discussions**: [GitHub Discussions](https://github.com/skylancer76/CodeMate.ai-Hackathon/discussions)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ for the CodeMate.ai Hackathon
