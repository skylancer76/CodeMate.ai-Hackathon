import os
import shutil
import subprocess
import shlex
import psutil
from pathlib import Path
from commands_list import COMMANDS, COMMAND_HELP

class CommandProcessor:
    def __init__(self):
        self.current_dir = Path.cwd()
        print(f"Command processor initialized in: {self.current_dir}")

    def execute(self, cmd: str) -> str:
        if not cmd or not cmd.strip():
            return ""
        
        parts = shlex.split(cmd.strip())
        if not parts:
            return ""
            
        command = parts[0].lower()
        args = parts[1:] if len(parts) > 1 else []

        # Check if command is supported
        if command not in COMMANDS:
            return f"Command not found: {command}. Type 'help' for available commands."

        # Try to find the command handler
        handler_method = getattr(self, f"cmd_{command}", None)
        if handler_method:
            try:
                result = handler_method(args)
                return result if result is not None else ""
            except Exception as e:
                print(f"Error in {command}: {e}")  # Debug logging
                return f"Error running {command}: {str(e)}"
        else:
            return f"Handler for '{command}' not implemented yet."

    # ---------- Command Handlers ----------

    def cmd_ls(self, args):
        try:
            items = os.listdir(self.current_dir)
            if not items:
                return "(empty directory)"
            return "\n".join(sorted(items))
        except PermissionError:
            return "Permission denied"
        except Exception as e:
            return f"Error listing directory: {e}"

    def cmd_cd(self, args):
        if not args:
            # Go to home directory if no args
            self.current_dir = Path.home()
            return f"Changed to home directory: {self.current_dir}"
        
        target = args[0]
        if target == "..":
            # Go up one level
            self.current_dir = self.current_dir.parent
            return f"Changed to parent directory: {self.current_dir}"
        
        new_path = (self.current_dir / target).resolve()
        if new_path.exists() and new_path.is_dir():
            self.current_dir = new_path
            return f"Changed to: {self.current_dir}"
        else:
            return f"Directory not found: {target}"

    def cmd_pwd(self, args):
        return str(self.current_dir)

    def cmd_mkdir(self, args):
        if not args:
            return "mkdir: missing operand"
        
        dirname = args[0]
        try:
            new_dir = self.current_dir / dirname
            new_dir.mkdir(parents=True, exist_ok=False)
            return f"Created directory: {dirname}"
        except FileExistsError:
            return f"Directory already exists: {dirname}"
        except PermissionError:
            return f"Permission denied: cannot create directory {dirname}"

    def cmd_rm(self, args):
        if not args:
            return "rm: missing operand"
        
        filename = args[0]
        target = self.current_dir / filename
        try:
            if target.is_file():
                target.unlink()
                return f"Removed file: {filename}"
            elif target.is_dir():
                return f"rm: {filename} is a directory (use rmdir or rm -r)"
            else:
                return f"rm: cannot remove '{filename}': No such file or directory"
        except PermissionError:
            return f"rm: cannot remove '{filename}': Permission denied"

    def cmd_rmdir(self, args):
        if not args:
            return "rmdir: missing operand"
        
        dirname = args[0]
        target = self.current_dir / dirname
        try:
            if target.is_dir():
                os.rmdir(target)  # Only removes empty directories
                return f"Removed directory: {dirname}"
            else:
                return f"rmdir: failed to remove '{dirname}': Not a directory"
        except OSError as e:
            return f"rmdir: failed to remove '{dirname}': {e}"

    def cmd_touch(self, args):
        if not args:
            return "touch: missing operand"
        
        filename = args[0]
        try:
            (self.current_dir / filename).touch(exist_ok=True)
            return f"Created/updated file: {filename}"
        except PermissionError:
            return f"touch: cannot touch '{filename}': Permission denied"

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
            return "kill: missing operand"
        try:
            pid = int(args[0])
            process = psutil.Process(pid)
            process.terminate()
            return f"Terminated process {pid}"
        except (ValueError, psutil.NoSuchProcess):
            return f"kill: process {args[0]} not found"
        except psutil.AccessDenied:
            return f"kill: permission denied for process {args[0]}"

    def cmd_help(self, args):
        help_text = "Available commands:\n"
        for cmd, desc in COMMAND_HELP.items():
            help_text += f"  {cmd:<10} - {desc}\n"
        help_text += "\nTip: Use 'cd ..' to go up one directory level"
        return help_text