import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSinglePostAction } from '../../app/slices/posts/actions';
import {
  AuthorInfo,
  Post as PostContent,
  PostInfo,
} from '../../features/posts';
import { useAppDispatch } from '../../hooks/store';
import { formatTime } from '../../utils/dateTime';

import type { PostDetails as PostDetailsType } from '../../app/slices/posts/types';

export const PostDetails = () => {
  const [post, setPost] = useState<PostDetailsType>();

  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      if (slug) {
        const { payload } = await dispatch(fetchSinglePostAction(slug));
        setPost(payload as PostDetailsType);
      }
    })();
  }, [slug, dispatch]);

  return (
    <Container maxWidth="xl">
      <Box mt={6}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={1}
          >
            <PostInfo
              commentsCount={20}
              likesCount={530}
              bookmarksCount={37}
            />
          </Grid>

          <Grid
            item
            xs={12}
            lg={9}
          >
            {post ? <PostContent {...post} /> : <></>}
          </Grid>
          <Grid
            item
            lg={2}
          >
            <AuthorInfo
              name={post?.author.fullName}
              avatar={post?.author.photo}
              bio={post?.author.bio}
              address={post?.author.address}
              followers={post?.author.followers}
              joined={post?.author.joined && formatTime(post?.author.joined)}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
