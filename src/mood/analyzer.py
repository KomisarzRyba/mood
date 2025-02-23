from os import getenv
from typing import Annotated

from openai import OpenAI

Sentiment = Annotated[float, "Sentiment"]


class SentimentAnalyzer:
    def __init__(self):
        self.openai = OpenAI(api_key=getenv("OPENAI_API_KEY"))

    def get_sentiment(self, text: str) -> Sentiment:
        prompt = f"Rate the sentiment of the following text on the scale from 0.00 to 1.00. Respond ONLY with a float in the range 0.00-1.00\nText: {text}\n"
        response = self.openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=0,
            max_tokens=50,
            frequency_penalty=0.5,
            presence_penalty=0,
        )
        sentiment_str = response.choices[0].text.strip()
        sentiment = float(sentiment_str)
        return sentiment
