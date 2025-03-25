import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(10, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  fileUrl: z.string().url("Invalid file URL"),
});
