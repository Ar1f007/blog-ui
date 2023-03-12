import { Slide } from '@mui/material';
import { forwardRef } from 'react';

import type { TransitionProps } from '@mui/material/transitions';
import type { ReactElement } from 'react';

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});
