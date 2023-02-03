import dayjs from 'dayjs';
import { z } from 'zod';

import type { Dayjs } from 'dayjs';

const MB_BYTES = 1000000;
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

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

  // coverImage: z
  //   .any()
  //   .refine((files) => files[0]?.size <= 5 * MB_BYTES, 'Max image size is 5MB')
  //   .refine((files) => `File must be one of [${ACCEPTED_MIME_TYPES.join(', ')}] but was ${files[0].type}`),
  coverImage: z.instanceof(File).superRefine((file, ctx) => {
    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File must be one of [${ACCEPTED_MIME_TYPES.join(', ')}] but was ${file.type}`,
      });
    }

    if (file.size > 5 * MB_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: 'array',
        message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${file.size}`,
        maximum: 3 * MB_BYTES,
        inclusive: true,
      });
    }
  }),
});

export type CreatePostPayload = z.infer<typeof createPostSchema>;
