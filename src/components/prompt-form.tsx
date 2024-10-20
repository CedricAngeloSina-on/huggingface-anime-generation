"use client";

import { env } from "~/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z
  .object({
    inputs: z
      .string()
      .min(10, {
        message: "Prompt must be at least 10 characters.",
      })
      .max(160, {
        message: "Prompt must not be longer than 30 characters.",
      }),
  })
  .strict();

async function query(data: unknown) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.1",
    {
      headers: {
        Authorization: `Bearer ${env.NEXT_PUBLIC_HUGGINGFACE_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  const result = await response.blob();
  return result;
}

export function PromptForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("sending request");

    await query(values).then((response) => {
      // Use the image directly
      const imageURL = URL.createObjectURL(response);
      const imageElement = document.createElement("img");
      imageElement.src = imageURL;
      // Append the image to your DOM
      document.body.appendChild(imageElement);
    });

    toast.message("You have submitted the following values", {
      description: JSON.stringify(values, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Inputs */}
        <FormField
          control={form.control}
          name="inputs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="1girl, green hair, sweater, looking at viewer, upper body, beanie, outdoors, night, turtleneck, masterpiece, best quality, very aesthetic"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
