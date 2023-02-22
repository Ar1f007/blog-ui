import { Container, Grid } from '@mui/material';

import { Articles, RightSidebar } from '../features/homepage';

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
        <Articles />
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
