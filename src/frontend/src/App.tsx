import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SentimentFormCard } from "./components/sentiment-form-card";
import { SentimentProvider } from "./components/sentiment-ctx";
import { SentimentIndicator } from "./components/sentiment-indicator";

const queryClient = new QueryClient();

function App() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <SentimentProvider>
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            <SentimentFormCard />
            <SentimentIndicator />
          </div>
        </SentimentProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
