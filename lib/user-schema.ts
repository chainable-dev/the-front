import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpUserSchema = loginUserSchema;

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type SignUpUserInput = z.infer<typeof signUpUserSchema>;