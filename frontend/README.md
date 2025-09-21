# Tyeetale Terminal Frontend

A modern, responsive web-based terminal interface built with React and TypeScript.

## ✨ Features

- **Clean Light Theme**: Professional white background with black borders
- **Real-time System Stats**: CPU, Memory, and Network usage display
- **Command Execution**: Execute 30+ terminal commands via backend API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Minimal Architecture**: Clean code with minimal dependencies

## 🛠️ Tech Stack

- **React 18.3.1** - Modern UI framework
- **TypeScript 5.0+** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling (no external CSS frameworks)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser to** `http://localhost:5173`

## ⚙️ Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app
```

## 📁 Project Structure

```
src/
├── App.tsx          # Main terminal component
├── App.css          # Terminal styling and theme
├── main.tsx         # Application entry point
└── index.css        # Global styles and reset
```

## 🔌 API Integration

The frontend communicates with the backend via REST API:

- `POST /execute` - Execute terminal commands
- `GET /stats` - Get system statistics
- `GET /test` - Test backend connectivity

## 🎨 Color Scheme

- **Background**: `#f5f5f5` (light gray)
- **Terminal Window**: `#ffffff` (white)
- **Borders**: `#000000` (black)
- **Title Bar**: `#e0e0e0` (light gray)
- **Text**: `#000000` (black)
- **Prompt**: `#0066cc` (blue)
- **Error**: `#ff0000` (red)
- **Status Bar**: `#f0f0f0` (light gray)

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The terminal interface is fully responsive and works on:
- Desktop computers (1920x1080 and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

## 🔧 Customization

### Theme Customization
Modify CSS variables in `App.css`:
```css
:root {
  --terminal-bg: #ffffff;
  --terminal-border: #000000;
  --terminal-text: #000000;
  --terminal-prompt: #0066cc;
}
```

### Adding New Features
1. Update `App.tsx` for new UI components
2. Modify `App.css` for styling
3. Update API calls as needed

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Check if backend is running
   - Verify `VITE_API_URL` in `.env`
   - Check browser console for errors

2. **Commands Not Working**
   - Ensure backend is deployed and accessible
   - Check network connectivity
   - Verify command syntax

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file imports
   - Verify responsive breakpoints

## 📄 License

This project is part of the Tyeetale Terminal application. See the main README for license information.