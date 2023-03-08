import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSinglePostAction } from '../../app/slices/posts/actions';
import { AuthorInfo, PostInfo } from '../../features/posts';
import { useAppDispatch } from '../../hooks/store';
import { formatTime } from '../../utils/dateTime';

import type { Post } from '../../app/slices/posts/types';

export const PostDetails = () => {
  const [post, setPost] = useState<Post>();
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  const author = post?.author;

  const ds = {
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
      <Grid
        container
        spacing={3}
        flexWrap="wrap"
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
          lg={7}
        >
          A
        </Grid>
        <Grid
          item
          lg={3}
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
    </Container>
  );
};
