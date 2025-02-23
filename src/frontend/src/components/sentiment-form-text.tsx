import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { sentimentFormSchema } from "./sentiment-form-card";
import { Textarea } from "./ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";

type SentimentFormTextProps = {
  form: UseFormReturn<z.infer<typeof sentimentFormSchema>>;
};
export const SentimentFormTextArea: FC<SentimentFormTextProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="text"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post text</FormLabel>
          <FormControl>
            <Textarea placeholder="eg. I love my professors!!!" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
