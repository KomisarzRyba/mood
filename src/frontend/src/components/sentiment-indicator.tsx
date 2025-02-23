import { FC } from "react";
import { Progress } from "./ui/progress";
import { useSentiment } from "./sentiment-ctx";
import { Sentiment } from "@/lib/api";

const getSentimentValue = (sentiment: Sentiment): number => {
  switch (sentiment) {
    case "Positive":
      return 1;
    case "Mostly Positive":
      return 0.8;
    case "Neutral":
      return 0.5;
    case "Mostly Negative":
      return 0.25;
    case "Negative":
      return 0.05;
  }
};

const getSentimentColor = (sentiment: Sentiment): string => {
  switch (sentiment) {
    case "Positive":
      return "bg-green-500";
    case "Mostly Positive":
      return "bg-green-300";
    case "Neutral":
      return "bg-yellow-300";
    case "Mostly Negative":
      return "bg-red-300";
    case "Negative":
      return "bg-red-500";
  }
};

export const SentimentIndicator: FC = () => {
  const { sentiment } = useSentiment();

  const value = sentiment ? getSentimentValue(sentiment) : 0;
  const color = sentiment ? getSentimentColor(sentiment) : undefined;

  return (
    <div className="flex flex-col items-center gap-4">
      <Progress
        value={value * 100}
        className="h-8 border transition-colors"
        indicatorColor={color}
      />
      {sentiment && <span>{sentiment}</span>}
    </div>
  );
};
