import axios from "axios";

export type Sentiment =
  | "Positive"
  | "Mostly Positive"
  | "Neutral"
  | "Mostly Negative"
  | "Negative";

export const getSentimentFromText = async (
  text: string,
): Promise<Sentiment> => {
  const res = await axios.post<Sentiment>("/api/sentiment", { text });
  return res.data;
};
