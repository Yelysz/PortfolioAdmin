import { z } from "zod";

const imageSchema = z.object({
  public_id: z.string().optional(),
  secure_url: z.string().url({ message: "Secure URL must be a valid URL" }).optional(),
});

export const projectSchema = z.object({
  title: z.string({required_error: "Title is required",}).min(1, { message: "Title cannot be empty" }).max(100, { message: "Title cannot exceed 100 characters" }),
  description: z.string({required_error: "Description is required",}).min(1, { message: "Description cannot be empty" }),
  image: imageSchema.optional(),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),
  github: z.string().url({ message: "GitHub link must be a valid URL" }).optional(),
  web: z.string().url({ message: "Website link must be a valid URL" }).optional(),
});
