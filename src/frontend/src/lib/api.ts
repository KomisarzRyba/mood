import axios from "axios";

export type Sentiment = number;

export const getSentimentFromText = async (
  text: string,
): Promise<Sentiment> => {
  const res = await axios.post<Sentiment>("/api/sentiment", { text });
  return res.data;
};
