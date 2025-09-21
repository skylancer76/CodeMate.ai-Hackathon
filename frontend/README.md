# Tyeetale Terminal Frontend

A simple, clean web-based terminal interface with a dark theme.

## Features

- **Dark Theme**: Clean dark blue-gray color scheme
- **Real-time System Stats**: CPU, Memory, and Network usage display
- **Command Execution**: Execute commands via backend API
- **Responsive Design**: Works on desktop and mobile devices
- **Simple Architecture**: Minimal dependencies, clean code

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling (no external CSS frameworks)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## API Integration

The frontend communicates with the backend via REST API:

- `POST /execute` - Execute terminal commands
- `GET /stats` - Get system statistics

## Color Scheme

- **Background**: `#1a1a1a` (dark gray)
- **Terminal Window**: `#1e1e2e` (dark blue-gray)
- **Title Bar**: `#2d3748` (darker blue-gray)
- **Accent**: `#4a9eff` (light blue)
- **Text**: `#ffffff` (white)
- **Error**: `#ff6b6b` (red)