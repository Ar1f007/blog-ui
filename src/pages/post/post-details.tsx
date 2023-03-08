import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSinglePostAction } from '../../app/slices/posts/actions';
import { useAppDispatch } from '../../hooks/store';

import type { Post } from '../../app/slices/posts/types';

export const PostDetails = () => {
  const [post, setPost] = useState<Post>();
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      if (slug) {
        const { payload } = await dispatch(fetchSinglePostAction(slug));

        setPost(payload as Post);
      }
    })();
  }, [slug, dispatch]);

  console.log(post);

  return <Container maxWidth="xl">{post?.author.firstName}</Container>;
};
