import { ComponentProps, FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SentimentFormTextArea } from "./sentiment-form-text";
import { Button } from "./ui/button";
import { getSentimentFromText } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSentiment } from "./sentiment-ctx";

export const sentimentFormSchema = z.object({
  text: z.string().min(3),
});

export const SentimentFormCard: FC<ComponentProps<"div">> = ({ className }) => {
  const { setSentiment } = useSentiment();

  const form = useForm<z.infer<typeof sentimentFormSchema>>({
    resolver: zodResolver(sentimentFormSchema),
    defaultValues: { text: "" },
  });

  const { mutate: getSentiment, isPending } = useMutation({
    mutationKey: ["sentiment"],
    mutationFn: async (values: z.infer<typeof sentimentFormSchema>) => {
      return getSentimentFromText(values.text);
    },
    onSuccess: (sentiment) => setSentiment(sentiment),
  });

  const onSubmit = (values: z.infer<typeof sentimentFormSchema>) => {
    getSentiment(values);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Yay or Nay 🤔</CardTitle>
        <CardDescription>How positive is this post?</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent>
            <SentimentFormTextArea form={form} />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              type="submit"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? <Loader className="animate-spin" /> : "Analyze"}
            </Button>
            <Button
              variant="ghost"
              type="reset"
              onClick={() => {
                form.reset();
                setSentiment(null);
              }}
            >
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
