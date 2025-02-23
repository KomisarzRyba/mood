import { FC } from "react";
import { Progress } from "./ui/progress";
import { useSentiment } from "./sentiment-ctx";

export const SentimentIndicator: FC = () => {
  const { sentiment } = useSentiment();

  return <Progress value={(sentiment ?? 0) * 100} className="h-8 border" />;
};
