import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import paths from '../../routes/paths';

import type { Post } from '../../app/slices/posts/types';

export const PostCard = (props: Post) => {
  const { slug, coverImage, title } = props;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(paths.posts + '/' + slug)}
      sx={{ cursor: 'pointer' }}
    >
      <CardMedia
        component="img"
        alt="cover image"
        height="140"
        image={coverImage}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          color="MenuText"
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
