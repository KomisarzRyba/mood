import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SentimentFormCard } from "./components/sentiment-form-card";
import { SentimentProvider } from "./components/sentiment-ctx";
import { SentimentIndicator } from "./components/sentiment-indicator";

const queryClient = new QueryClient();

function App() {
  return (
    <main className="container mx-auto my-12">
      <QueryClientProvider client={queryClient}>
        <SentimentProvider>
          <div className="flex flex-col gap-4">
            <SentimentFormCard />
            <SentimentIndicator />
          </div>
        </SentimentProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
