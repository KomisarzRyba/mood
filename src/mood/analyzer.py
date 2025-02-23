from enum import StrEnum
from os import getenv

from openai import OpenAI


class Sentiment(StrEnum):
    POS = "Positive"
    M_POS = "Mostly Positive"
    NEU = "Neutral"
    M_NEG = "Mostly Negative"
    NEG = "Negative"


class SentimentAnalyzer:
    def __init__(self):
        self.openai = OpenAI(api_key=getenv("OPENAI_API_KEY"))

    def get_sentiment(self, text: str) -> Sentiment:
        prompt = f'Decide if treturn he following text\'s sentiment is Positive, Mostly Positive, Neutral, Mostly Negative or Negative. Respond only with the sentiment value ("Positive", "Mostly Positive", "Neutral", "Mostly Negative" or "Negative").\nText: {text}\n'
        response = self.openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=0,
            max_tokens=10,
            frequency_penalty=0.5,
            presence_penalty=0,
        )
        sentiment_str = response.choices[0].text.strip()
        return Sentiment(sentiment_str)
