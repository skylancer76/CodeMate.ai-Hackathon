from setuptools import setup, find_packages

setup(
    name="tyeetale-terminal-backend",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.104.1",
        "uvicorn[standard]==0.24.0",
        "psutil==5.9.6",
        "pydantic==2.5.0",
    ],
    python_requires=">=3.9",
)
