import { z } from 'zod';

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, { message: 'Please type or email or username' }),

  password: z.string().min(1, { message: 'Please type your password' }),
});

export default loginSchema;
export type LoginInputs = z.infer<typeof loginSchema>;
