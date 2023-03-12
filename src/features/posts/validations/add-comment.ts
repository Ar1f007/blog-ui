import { z } from 'zod';

export const commentSchema = z
  .object({
    commentDesc: z
      .string()
      .min(1, 'Can not be left empty')
      .transform((val) =>
        val
          .replace(/<p>\s*(?:&nbsp;|\s|<br\s*\/?>)*\s*<\/p>/g, '')
          .replace(/\n/g, ''),
      ),
  })
  .superRefine(({ commentDesc }, ctx) => {
    const regex = /^(\s*<p>\s*(?:&nbsp;|\s|<br\s*\/?>)*\s*<\/p>\s*)+$/;

    const hasEmptyContent = regex.test(commentDesc);

    if (hasEmptyContent) {
      ctx.addIssue({
        code: 'custom',
        message: 'Can not be left empty',
        path: ['commentDesc'],
      });
    }
  });

export type CommentPayload = z.infer<typeof commentSchema>;
