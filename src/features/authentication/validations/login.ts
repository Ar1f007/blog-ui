import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Please type your email' }),
  password: z.string().min(1, { message: 'Please type your password' }),
});

export default loginSchema;
export type LoginInputs = z.infer<typeof loginSchema>;
