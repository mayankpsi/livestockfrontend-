import React from 'react';
import {Skeleton, Stack} from '@mui/material';

export default function SkeletonLoader({width, height}) {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={width} height={height} />
    </Stack>
  )

}
