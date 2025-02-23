from dotenv import load_dotenv

from .server import app

load_dotenv(".env.local")
__all__ = ["app"]
