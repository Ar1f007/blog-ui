import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().trim().min(5),

  description: z.string().trim().min(15),

  category: z.string().min(1),

  tags: z.array(z.string()),

  published_at: z.date(),
});

export type CreatePostPayload = z.infer<typeof createPostSchema>;
