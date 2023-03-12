import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Box, Button, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import { z } from 'zod';

import logo from '../../../../assets/images/logo.webp';
import { FormProvider, TextEditor } from '../../../../components';

import type { SubmitHandler } from 'react-hook-form';

import { APP_NAME } from '../../../../constant';
import { useAppSelector } from '../../../../hooks/store';
import AuthCard from '../../../authentication/components/auth-modal';

const commentSchema = z
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

type CommentPayload = z.infer<typeof commentSchema>;

export const AddComment = () => {
  const user = useAppSelector((s) => s.user, shallowEqual);
  const [avatar, setAvatar] = useState<{ src: string; alt: string }>();

  const [showPopup, setShowPopup] = useState(false);

  const methods = useForm<CommentPayload>({
    defaultValues: {
      commentDesc: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentPayload> = (data) => {
    console.log(data);
  };

  function handleOnTextEditorClick() {
    if (!user.data) {
      setShowPopup(true);
    }
  }

  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (user.data) {
      setAvatar({
        src: user.data?.photo ?? user.data.firstName,
        alt: user.data.firstName,
      });
    } else {
      setAvatar({
        src: logo,
        alt: APP_NAME,
      });
    }
  }, [user.data]);

  return (
    <>
      <Stack
        direction="row"
        columnGap={2}
        alignItems="flex-start"
      >
        <Avatar
          src={avatar?.src}
          alt={avatar?.alt}
        />

        <Box
          flexGrow={1}
          onClick={handleOnTextEditorClick}
        >
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <TextEditor name="commentDesc" />

            {user.data && (
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1.5 }}
              >
                Comment
              </Button>
            )}
          </FormProvider>
        </Box>
      </Stack>
      <Divider />

      <AuthCard
        open={showPopup}
        onClose={handleClose}
      />
    </>
  );
};
