import { z } from "zod";

export const skillSchema = z.object({
  image: z
    .object({
      public_id: z.string().min(1, { message: "Public ID is required" }),
      secure_url: z.string().url({ message: "Secure URL must be a valid URL" }),
    })
    .optional(),
  alt: z
    .string()
    .min(3, { message: "Alt text must be at least 3 characters long" })
    .max(100, { message: "Alt text must be at most 100 characters long" })
    .optional(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(50, { message: "Title must be at most 50 characters long" }),
});
