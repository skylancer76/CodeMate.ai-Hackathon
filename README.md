# Backend Setup

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Running the server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /execute` - Execute a command
- `GET /autocomplete?prefix=<prefix>` - Get command suggestions
- `GET /stats` - Get system statistics