import { z } from "zod";

export const studentSchema = z.object({
    name: z.string().min(3, "Please enter a valid name!"),
    role: z.string().min(2, "Role is required"),
    avatar: z.string().min(1, "Please select an avatar!")
});

export type StudentFormData = z.infer<typeof studentSchema >