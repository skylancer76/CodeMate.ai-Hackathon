from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psutil
from command_processor import CommandProcessor
from commands_list import COMMANDS

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

processor = CommandProcessor()

class CommandRequest(BaseModel):
    command: str

@app.post("/execute")
def run_command(req: CommandRequest):
    output = processor.execute(req.command)
    return {"output": output}

@app.get("/autocomplete")
def autocomplete(prefix: str):
    matches = [c for c in COMMANDS if c.startswith(prefix)]
    return {"suggestions": matches}

@app.get("/stats")
def stats():
    mem = psutil.virtual_memory().percent
    cpu = psutil.cpu_percent()
    net = psutil.net_io_counters()
    return {
        "cpu": cpu,
        "mem": mem,
        "net_up": net.bytes_sent,
        "net_down": net.bytes_recv
    }