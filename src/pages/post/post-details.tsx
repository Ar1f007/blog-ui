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

import type { Post } from '../../app/slices/posts/types';

export const PostDetails = () => {
  const [post, setPost] = useState<Post>();
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  const author = post?.author;

  const ds = {
    post: {
      title: post?.title,
      coverImage: post?.coverImage,
      description: post?.description,
      published_at: post?.published_at,
      tags: post?.tags,
      category: post?.category,
    },

    author: {
      firstName: post?.author.firstName,
      lastName: post?.author.lastName,
      bio: author?.bio || '',
      followers: author?.followers.length,
      address: author?.address || '',
      joined: (author?.createdAt && formatTime(author?.createdAt)) || '',
      photo: author?.photo,

      getFullName() {
        return (this?.firstName || '') + ' ' + (this?.lastName || '');
      },
    },
  };

  useEffect(() => {
    (async function () {
      if (slug) {
        const { payload } = await dispatch(fetchSinglePostAction(slug));

        setPost(payload as Post);
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
            <PostContent
              {...ds.post}
              name={ds.author.getFullName()}
            />
          </Grid>
          <Grid
            item
            lg={2}
          >
            <AuthorInfo
              name={ds.author.getFullName()}
              avatar={ds.author.photo}
              bio={ds.author.bio}
              address={ds.author.address}
              followers={ds.author.followers}
              joined={ds.author.joined}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
