import { z } from "zod";

export const educationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, { message: "Title cannot be empty" }),
  place: z
    .string({
      required_error: "Place is required",
    })
    .min(1, { message: "Place cannot be empty" }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, { message: "Description cannot be empty" }),
  firstDate: z.string().transform((str) => new Date(str)),
  secondDate: z.string().transform((str) => new Date(str)),
});
