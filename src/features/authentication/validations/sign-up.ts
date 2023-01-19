import { z } from 'zod';

const signupSchema = z
  .object({
    username: z
      .string({ required_error: 'username is required' })
      .trim()
      .min(3, { message: 'username should be at least 3 character(s) long' })
      .regex(new RegExp(/^\S+$/), { message: 'no spaces allowed' }),

    firstName: z
      .string({ required_error: 'First name is required' })
      .trim()
      .min(3, { message: 'First name should be at least 3 character(s) long' }),

    lastName: z.string({ required_error: 'Last name is required' }).trim().min(1, { message: 'Last name is required' }),

    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(5, { message: 'Must be 5 or more characters long' })
      .max(25, { message: 'Must be 25 or fewer characters long' }),

    confirmPassword: z.string({ required_error: 'Please confirm your password' }).trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export default signupSchema;
export type SignUpInputs = z.infer<typeof signupSchema>;
