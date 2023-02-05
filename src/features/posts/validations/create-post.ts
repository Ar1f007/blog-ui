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

export const createPostSchema = z
  .object({
    title: z.string().min(1, { message: 'Add a title' }),

    description: z.string().trim().min(1, { message: 'Write your story' }),

    category: selectSchema,

    tags: z.array(selectSchema),

    published_at: z.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Not a valid date' }),

    coverImage: z
      .any()
      .superRefine((files, ctx) => {
        if (!ACCEPTED_MIME_TYPES.includes(files[0]?.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File must be one of [${ACCEPTED_MIME_TYPES.join(', ')}] but was ${files[0]?.type}`,
          });
        }

        if (files[0].size > 5 * MB_BYTES) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'array',
            message: `The file must not be larger than ${5 * MB_BYTES} bytes: ${files[0]?.size}`,
            maximum: 5 * MB_BYTES,
            inclusive: true,
          });
        }
      })
      .optional(),
  })
  .superRefine(({ description }, ctx) => {
    if (description === '<p><br></p>') {
      ctx.addIssue({
        code: 'custom',
        message: 'Write your story',
        path: ['description'],
      });
    }
  });

export type CreatePostPayload = z.infer<typeof createPostSchema>;
