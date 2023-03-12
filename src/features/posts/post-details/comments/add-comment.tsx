import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';

import type { ErrData } from '../../../../types/others';
import type { CommentPayload } from '../../validations/add-comment';

import { useAddCommentMutation } from '../../../../app/slices/comments';

import type { SubmitHandler } from 'react-hook-form';

import logo from '../../../../assets/images/logo.webp';
import { FormProvider, TextEditor } from '../../../../components';
import { APP_NAME } from '../../../../constant';
import { useAppSelector } from '../../../../hooks/store';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../../../utils';
import AuthCard from '../../../authentication/components/auth-modal';
import { commentSchema } from '../../validations/add-comment';

type Props = {
  postId: string;
};

export const AddComment = ({ postId }: Props) => {
  const [addComment, { isLoading, isSuccess }] = useAddCommentMutation();

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

  const onSubmit: SubmitHandler<CommentPayload> = async (data) => {
    const commentPayload = {
      postId,
      content: data.commentDesc,
    };

    try {
      await addComment(commentPayload).unwrap();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg =
          'error' in err
            ? err.error
            : (err.data as ErrData)?.message || 'Something went wrong';

        toast.error(errMsg, {
          toastId: 'fetchBaseError',
        });
      } else if (isErrorWithMessage(err)) {
        toast.error(err.message, {
          toastId: 'errorWithMessage',
        });
      }
    }
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

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
    }
  }, [isSuccess, methods]);

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
                disabled={isLoading}
              >
                {isLoading && (
                  <CircularProgress
                    color="inherit"
                    size={22}
                    sx={{ mr: 1 }}
                  />
                )}
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
