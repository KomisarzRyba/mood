import { FC, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SentimentFormUrlField } from "./sentiment-form-url";
import { Button } from "./ui/button";
import { getSentimentFromText } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSentiment } from "./sentiment-ctx";

export const sentimentFormSchema = z.object({
  text: z.string().min(3).optional(),
  url: z.string().url().optional(),
});

export const SentimentFormCard: FC = () => {
  const [submitMethod, setSubmitMethod] = useState<"text" | "url">("text");
  const { setSentiment } = useSentiment();

  const form = useForm<z.infer<typeof sentimentFormSchema>>({
    resolver: zodResolver(sentimentFormSchema),
    defaultValues: { text: undefined, url: undefined },
  });

  const { mutate: getSentiment, isPending } = useMutation({
    mutationKey: ["sentiment", form.getValues()],
    mutationFn: async (values: z.infer<typeof sentimentFormSchema>) => {
      if (submitMethod === "text") {
        if (!values.text) return;
        return getSentimentFromText(values.text);
      }
    },
    onSuccess: (sentiment) => setSentiment(sentiment ?? null),
  });

  const onSubmit = (values: z.infer<typeof sentimentFormSchema>) => {
    getSentiment(values, { onSuccess: (sentiment) => console.log(sentiment) });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yay or Nay 🤔</CardTitle>
        <CardDescription>How positive is this post?</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent>
            <Tabs
              value={submitMethod}
              onValueChange={(value) =>
                setSubmitMethod(value as "text" | "url")
              }
            >
              <TabsList className="w-full mb-2">
                <TabsTrigger value="text" className="w-full">
                  From Text
                </TabsTrigger>
                <TabsTrigger value="url" className="w-full">
                  From URL
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <SentimentFormTextArea form={form} />
              </TabsContent>
              <TabsContent value="url">
                <SentimentFormUrlField form={form} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              type="submit"
              disabled={!form.formState.isDirty || isPending}
            >
              {isPending ? <Loader className="animate-spin" /> : "Analyze"}
            </Button>
            <Button variant="ghost" type="reset" onClick={() => form.reset()}>
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
