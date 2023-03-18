import { Box, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchSinglePostAction } from '../../app/slices/posts/actions';
import {
  AuthorInfo,
  Post as PostContent,
  PostInfo,
} from '../../features/posts';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { formatTime } from '../../utils/dateTime';

export const PostDetails = () => {
  const { loading, currentlyViewedPost: postData } = useAppSelector(
    (s) => s.post,
  );

  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      if (slug) {
        await dispatch(fetchSinglePostAction(slug));
      }
    })();
  }, [slug, dispatch]);

  if (loading) {
    return <>loading</>;
  }

  return (
    <>
      {!!postData && (
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
                  likesCount={530}
                  bookmarksCount={37}
                />
              </Grid>

              <Grid
                item
                xs={12}
                lg={9}
              >
                {postData ? <PostContent {...postData} /> : <></>}
              </Grid>
              <Grid
                item
                lg={2}
              >
                <AuthorInfo
                  name={postData?.author.fullName}
                  avatar={postData?.author.photo}
                  bio={postData?.author.bio}
                  address={postData?.author.address}
                  followers={postData?.author.followers}
                  joined={
                    postData?.author.joined &&
                    formatTime(postData?.author.joined)
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};
