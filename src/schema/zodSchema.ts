import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6(six) characters long." }),
});

export type SigninFormType = z.infer<typeof signinSchema>;
