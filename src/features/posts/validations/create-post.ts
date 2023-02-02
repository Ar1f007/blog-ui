import dayjs from 'dayjs';
import { z } from 'zod';

import type { Dayjs } from 'dayjs';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

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

  coverImage: z
    .any()
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, 'Max image size is 5MB')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      'Only .jpg, .jpeg, .png, .webp and .avif formats are supported',
    ),
});

export type CreatePostPayload = z.infer<typeof createPostSchema>;
