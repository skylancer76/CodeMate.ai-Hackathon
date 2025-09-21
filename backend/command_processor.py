import os
import shutil
import subprocess
import shlex
import psutil
from pathlib import Path
from commands_list import COMMANDS

class CommandProcessor:
    def __init__(self):
        self.current_dir = Path.cwd()

    # ---------- Main Entry ----------
    def execute(self, cmd: str) -> str:
        parts = shlex.split(cmd)
        if not parts:
            return ""
        command, *args = parts

        if command not in COMMANDS:
            return f"Error: '{command}' is not a supported command."

        # map command to handler
        func = getattr(self, f"cmd_{command}", None)
        if func:
            try:
                return func(args)
            except Exception as e:
                return f"Error: {e}"
        else:
            return f"Error: '{command}' handler not implemented."

    # ---------- Command Handlers ----------

    def cmd_ls(self, args):
        items = os.listdir(self.current_dir)
        return "\n".join(items) if items else "(empty)"

    def cmd_cd(self, args):
        if not args:
            return "Usage: cd <directory>"
        new_path = (self.current_dir / args[0]).resolve()
        if new_path.is_dir():
            self.current_dir = new_path
            return f"Changed directory to {self.current_dir}"
        return f"No such directory: {args[0]}"

    def cmd_pwd(self, args):
        return str(self.current_dir)

    def cmd_mkdir(self, args):
        if not args:
            return "Usage: mkdir <dirname>"
        Path(self.current_dir / args[0]).mkdir(parents=True, exist_ok=False)
        return f"Directory '{args[0]}' created."

    def cmd_rm(self, args):
        if not args:
            return "Usage: rm <file>"
        target = self.current_dir / args[0]
        if target.is_file():
            target.unlink()
            return f"File '{args[0]}' removed."
        return f"No such file: {args[0]}"

    def cmd_rmdir(self, args):
        if not args:
            return "Usage: rmdir <dir>"
        target = self.current_dir / args[0]
        if target.is_dir():
            os.rmdir(target)
            return f"Directory '{args[0]}' removed."
        return f"No such directory: {args[0]}"

    def cmd_touch(self, args):
        if not args:
            return "Usage: touch <file>"
        (self.current_dir / args[0]).touch(exist_ok=True)
        return f"File '{args[0]}' created."

    def cmd_cat(self, args):
        if not args:
            return "Usage: cat <file>"
        file = self.current_dir / args[0]
        if file.is_file():
            return file.read_text()
        return f"No such file: {args[0]}"

    def cmd_echo(self, args):
        return " ".join(args)

    def cmd_clear(self, args):
        # Front-end instruction to clear; no server action
        return "<CLEAR_SCREEN>"

    def cmd_mv(self, args):
        if len(args) != 2:
            return "Usage: mv <src> <dest>"
        src = self.current_dir / args[0]
        dst = self.current_dir / args[1]
        shutil.move(src, dst)
        return f"Moved '{args[0]}' to '{args[1]}'"

    def cmd_cp(self, args):
        if len(args) != 2:
            return "Usage: cp <src> <dest>"
        src = self.current_dir / args[0]
        dst = self.current_dir / args[1]
        shutil.copy(src, dst)
        return f"Copied '{args[0]}' to '{args[1]}'"

    def cmd_head(self, args):
        if not args:
            return "Usage: head <file>"
        file = self.current_dir / args[0]
        return "\n".join(file.read_text().splitlines()[:10])

    def cmd_tail(self, args):
        if not args:
            return "Usage: tail <file>"
        file = self.current_dir / args[0]
        lines = file.read_text().splitlines()
        return "\n".join(lines[-10:])

    def cmd_grep(self, args):
        if len(args) < 2:
            return "Usage: grep <pattern> <file>"
        pattern, filename = args[0], args[1]
        file = self.current_dir / filename
        out = [l for l in file.read_text().splitlines() if pattern in l]
        return "\n".join(out) if out else "(no matches)"

    def cmd_find(self, args):
        term = args[0] if args else ""
        matches = []
        for root, dirs, files in os.walk(self.current_dir):
            for name in files + dirs:
                if term in name:
                    matches.append(os.path.join(root, name))
        return "\n".join(matches) if matches else "(no matches)"

    def cmd_whoami(self, args):
        return os.getlogin()

    def cmd_date(self, args):
        return subprocess.check_output(["date"]).decode().strip()

    def cmd_ps(self, args):
        procs = [f"{p.pid}\t{p.name()}" for p in psutil.process_iter(['name'])]
        return "\n".join(procs[:30])

    def cmd_kill(self, args):
        if not args:
            return "Usage: kill <pid>"
        pid = int(args[0])
        psutil.Process(pid).terminate()
        return f"Process {pid} terminated."