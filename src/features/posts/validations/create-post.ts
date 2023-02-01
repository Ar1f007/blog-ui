import dayjs from 'dayjs';
import { z } from 'zod';

import type { Dayjs } from 'dayjs';

const selectSchema = z.object({
  value: z.string(),
  label: z.string(),
  __isNew__: z.boolean().optional(),
});

export const createPostSchema = z.object({
  title: z.string().min(1),

  description: z.string().min(1),

  category: selectSchema,

  tags: z.array(selectSchema),

  published_at: z.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Not a valid date' }),
});

export type CreatePostPayload = z.infer<typeof createPostSchema>;
