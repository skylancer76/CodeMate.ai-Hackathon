from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time
from command_processor import CommandProcessor
from commands_list import COMMANDS

# Initialize FastAPI app
app = FastAPI(title="Terminal API", version="1.0.0")

# CORS middleware - had to add this for frontend to work
import os

allowed_origins = [
    "http://localhost:8080",  # Local development
    "http://localhost:3000",  # Alternative local port
]

# Add production frontend URL from environment variable
frontend_url = os.environ.get("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global command processor instance
processor = CommandProcessor()

class CommandRequest(BaseModel):
    command: str

@app.post("/execute")
def run_command(req: CommandRequest):
    try:
        output = processor.execute(req.command)
        return {"output": output}
    except Exception as e:
        # Log error for debugging
        print(f"Error executing command '{req.command}': {str(e)}")
        return {"output": f"Error: {str(e)}"}

@app.get("/autocomplete")
def autocomplete(prefix: str):
    if not prefix:
        return {"suggestions": []}
    
    # Simple prefix matching
    matches = [c for c in COMMANDS if c.startswith(prefix.lower())]
    return {"suggestions": matches}

@app.get("/stats")
def stats():
    try:
        mem = psutil.virtual_memory().percent
        cpu = psutil.cpu_percent(interval=1)  # Get actual CPU usage
        net = psutil.net_io_counters()
        
        return {
            "cpu": round(cpu, 1),
            "mem": round(mem, 1),
            "net_up": net.bytes_sent,
            "net_down": net.bytes_recv
        }
    except Exception as e:
        print(f"Error getting stats: {e}")
        # Return default values if stats fail
        return {
            "cpu": 0.0,
            "mem": 0.0,
            "net_up": 0,
            "net_down": 0
        }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": time.time()}