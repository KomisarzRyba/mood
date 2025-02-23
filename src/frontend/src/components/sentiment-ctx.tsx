import { Sentiment } from "@/lib/api";
import {
  useContext,
  createContext,
  FC,
  PropsWithChildren,
  useState,
} from "react";

type SentimentContext = {
  sentiment: Sentiment | null;
  setSentiment: (sentiment: Sentiment | null) => void;
};
const SentimentContext = createContext<SentimentContext>({
  sentiment: null,
  setSentiment: () => {},
});

export const SentimentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  return (
    <SentimentContext.Provider value={{ sentiment, setSentiment }}>
      {children}
    </SentimentContext.Provider>
  );
};

export const useSentiment = (): SentimentContext => {
  return useContext(SentimentContext);
};
