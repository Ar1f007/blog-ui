import { Grid } from '@mui/material';

import { StatCard } from '../../components';

const stats = [
  {
    title: 'Total Post Reaction',
    total: 0,
  },
  {
    title: 'Total Post Views',
    total: 500,
  },
  {
    title: 'Total Listings',
    total: 5,
  },
];

const Stats = () => (
  <Grid
    container
    spacing={2}
  >
    {stats.map((stat, index) => (
      <Grid
        item
        key={index}
        xs={6}
        lg={4}
      >
        <StatCard
          title={stat.title}
          total={stat.total}
        />
      </Grid>
    ))}
  </Grid>
);
export default Stats;
