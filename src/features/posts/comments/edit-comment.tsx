import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateCommentMutation } from '../../../app/slices/comments';
import { FormProvider, TextEditor } from '../../../components';
import { commentSchema } from '../validations/add-comment';

import type { CommentPayload } from '../validations/add-comment';

type Props = {
  commentId: string;
  content: string;
  closeDialog: () => void;
};

export const EditComment = (props: Props) => {
  const { content, commentId, closeDialog } = props;
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const methods = useForm<CommentPayload>({
    mode: 'onSubmit',
    defaultValues: {
      commentDesc: content,
    },

    resolver: zodResolver(commentSchema),
  });

  const {
    formState: { isSubmitSuccessful },
    reset,
  } = methods;

  async function onSubmit(data: CommentPayload) {
    updateComment({
      commentId,
      body: {
        content: data.commentDesc,
      },
    });
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      closeDialog();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Stack rowGap={1}>
        <TextEditor name="commentDesc" />

        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <CircularProgress
              size={22}
              sx={{ mr: 1 }}
            />
          )}
          Update
        </Button>
      </Stack>
    </FormProvider>
  );
};
