import { Container, Grid } from '@mui/material';

import { Post } from '../components/ui/post-card';

export const Home = () => (
  <Container>
    <Grid
      container
      spacing={5}
    >
      <Grid
        item
        lg={8}
      >
        <div>
          <Post showHeader />

          <Post showHeader />
        </div>
      </Grid>
      <Grid
        item
        lg={4}
      >
        B
      </Grid>
    </Grid>
  </Container>
);
