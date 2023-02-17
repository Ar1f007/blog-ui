import { Container, Grid } from '@mui/material';

import { Post } from '../components/ui/post-card';
import { RightSidebar } from '../features/homepage';

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
          <Post showHeader={false} />

          <Post showHeader />
        </div>
      </Grid>
      <Grid
        item
        lg={4}
      >
        <RightSidebar />
      </Grid>
    </Grid>
  </Container>
);
