import { z } from "zod";

export const experienceSchema = z.object({
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
  firstDate: z.date({
    required_error: "First Date is required",
  }),
  secondDate: z.date({
    required_error: "Second Date is required",
  }),
});
