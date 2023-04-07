import dayjs from 'dayjs';
import { z } from 'zod';

import { ACCEPTED_MIME_TYPES, MB_BYTES } from '../../../constant';
import { bytesToMB } from '../../../utils/others';

import type { Dayjs } from 'dayjs';

export const selectSchema = z.object({
  value: z.string(),
  label: z.string(),
  __isNew__: z.boolean().optional(),
});

export const createPostSchema = z
  .object({
    title: z.string().min(1, { message: "Title can't be blank" }),

    description: z
      .string()
      .trim()
      .min(1, { message: "Content can't be blank" }),

    category: selectSchema,

    tags: z.array(selectSchema, {
      required_error: 'Add/create tag(s) (up to 3)',
    }),

    published_at: z.instanceof(dayjs as unknown as typeof Dayjs, {
      message: 'Not a valid date',
    }),

    coverImage: z
      .any()
      .superRefine((files, ctx) => {
        if (!ACCEPTED_MIME_TYPES.includes(files[0]?.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File must be one of [${ACCEPTED_MIME_TYPES.join(', ')}]}`,
          });
        }

        if (files[0]?.size > 5 * MB_BYTES) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'array',
            message: `Max allowed size is 5MB. Your current file size is ${bytesToMB(
              files[0]?.size,
            )}`,
            maximum: 5 * MB_BYTES,
            inclusive: true,
          });
        }
      })
      .optional(),
  })
  .superRefine(({ description, tags }, ctx) => {
    const regex = /^(\s*<p>\s*(?:&nbsp;|\s|<br\s*\/?>)*\s*<\/p>\s*)+$/;

    const hasEmptyContent = regex.test(description);

    if (hasEmptyContent) {
      ctx.addIssue({
        code: 'custom',
        message: 'Write your story',
        path: ['description'],
      });
    }

    if (tags.length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Add at least 1 tag to the post',
        path: ['tags'],
      });
    }
  });

export type CreatePostPayload = z.infer<typeof createPostSchema>;
