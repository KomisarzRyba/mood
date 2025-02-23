from typing import Annotated

from fastapi import Depends, Request

from .analyzer import SentimentAnalyzer


def get_sentiment_analyzer(request: Request) -> SentimentAnalyzer:
    return request.app.state.analyzer


SentimentAnalyzerDep = Annotated[SentimentAnalyzer, Depends(get_sentiment_analyzer)]
