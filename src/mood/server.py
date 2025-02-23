from contextlib import asynccontextmanager
import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .analyzer import Sentiment, SentimentAnalyzer
from .dependencies import SentimentAnalyzerDep


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.analyzer = SentimentAnalyzer()
    yield


app = FastAPI(lifespan=lifespan, root_path="/api")


class SentimentRequestBody(BaseModel):
    text: str


@app.post("/sentiment", response_model=Sentiment)
def sentiment(body: SentimentRequestBody, analyzer: SentimentAnalyzerDep) -> Sentiment:
    return analyzer.get_sentiment(body.text)


frontend_dir = os.path.join(os.path.dirname(__file__), os.pardir, "frontend", "dist")
app.mount("/", StaticFiles(directory=frontend_dir, html=True))
