import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { sentimentFormSchema } from "./sentiment-form-card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type SentimentFormUrlProps = {
  form: UseFormReturn<z.infer<typeof sentimentFormSchema>>;
};
export const SentimentFormUrlField: FC<SentimentFormUrlProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post URL</FormLabel>
          <FormControl>
            <Input
              placeholder="eg. https://x.com/WSSURAMS/status/123"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
