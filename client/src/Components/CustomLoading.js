import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomLoading() {
  return (
    <Stack  sx={{ color: 'grey.500', alignItems:'center', justifyContent:'center' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  );
}