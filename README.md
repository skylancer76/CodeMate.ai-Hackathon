# 🖥️ Tyeetale Terminal

A modern, web-based terminal interface built with React and FastAPI. Experience the power of command-line operations through an intuitive, responsive web application.

![Terminal Preview](https://img.shields.io/badge/Terminal-Web%20Based-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688)
![Python](https://img.shields.io/badge/Python-3.9+-3776ab)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6)

## ✨ Features

### 🎨 **Modern Interface**
- Clean, responsive design with light/dark theme support
- Real-time system resource monitoring
- Intuitive command-line interface
- Mobile-friendly responsive layout

### 🚀 **30+ Terminal Commands**
- **File & Directory Operations**: `ls`, `cd`, `pwd`, `mkdir`, `rm`, `touch`, `cat`, `echo`, `mv`, `cp`, `ln`, `chmod`, `chown`, `file`, `stat`
- **Text Processing**: `head`, `tail`, `grep`, `sed`, `awk`, `sort`, `uniq`, `wc`, `cut`
- **System Information**: `whoami`, `date`, `uptime`, `uname`, `df`, `du`, `free`, `top`, `ps`, `kill`, `killall`, `jobs`, `bg`, `fg`
- **Network & Utilities**: `ping`, `curl`, `wget`, `ssh`, `scp`, `tar`, `zip`, `unzip`
- **Terminal Control**: `clear`, `history`, `alias`, `export`, `env`, `which`, `whereis`
- **Help & Documentation**: `help`, `man`, `info`

### 🔒 **Security & Sandboxing**
- Isolated terminal environment
- Sandboxed file system access
- Secure command execution
- No system-level access

### 📊 **Real-time Monitoring**
- CPU usage tracking
- Memory utilization display
- Network activity monitoring
- System status indicators

## 🏗️ Architecture

```
Tyeetale Terminal/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── App.tsx          # Main terminal component
│   │   ├── App.css          # Terminal styling
│   │   └── main.tsx         # Application entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # FastAPI Python server
│   ├── main.py              # FastAPI application
│   ├── command_processor.py # Command execution engine
│   ├── commands_list.py     # Available commands
│   └── requirements.txt     # Python dependencies
├── terminal_root/           # Sandboxed terminal environment
│   ├── home/               # User home directory
│   ├── documents/          # Documents folder
│   ├── downloads/          # Downloads folder
│   └── projects/           # Projects folder
└── railway.toml            # Railway deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tyeetale-terminal.git
   cd tyeetale-terminal
   ```

2. **Start the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Terminal**
   Open your browser and navigate to `http://localhost:5173`

### Production Deployment

The application is configured for deployment on Railway:

1. **Backend**: Automatically deployed from the `backend/` directory
2. **Frontend**: Deploy to Vercel, Netlify, or any static hosting service

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript 5.0+** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design

### Backend
- **FastAPI 0.104.1** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **psutil** - System information

### Deployment
- **Railway** - Backend hosting
- **Nixpacks** - Build system
- **Docker** - Containerization

## 📖 Usage

### Basic Commands
```bash
# List directory contents
ls

# Change directory
cd documents
cd ..  # Go up one level
cd ~   # Go to home directory

# Create files and directories
touch newfile.txt
mkdir newfolder

# View file contents
cat newfile.txt
head newfile.txt  # First 10 lines
tail newfile.txt  # Last 10 lines

# Search in files
grep "pattern" filename.txt

# System information
whoami
date
uptime
df  # Disk usage
free # Memory usage
```

### Getting Help
```bash
help        # Show all available commands
man ls      # Show manual for specific command
info grep   # Show info documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=https://your-railway-backend-url.railway.app
```

### Customization
- **Colors**: Modify `frontend/src/App.css` for theme customization
- **Commands**: Add new commands in `backend/commands_list.py`
- **Styling**: Update CSS variables for different color schemes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write clear, documented code
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the CodeMate.ai Hackathon
- Inspired by modern terminal interfaces
- Thanks to the open-source community for amazing tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/tyeetale-terminal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/tyeetale-terminal/discussions)
- **Email**: support@tyeetale.com

---

<div align="center">
  <p>Made with ❤️ by the Tyeetale Team</p>
  <p>
    <a href="https://github.com/your-username/tyeetale-terminal">⭐ Star us on GitHub</a>
    •
    <a href="https://tyeetale-terminal.railway.app">🌐 Live Demo</a>
    •
    <a href="https://github.com/your-username/tyeetale-terminal/issues">🐛 Report Bug</a>
  </p>
</div>