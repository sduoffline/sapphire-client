import React from 'react';
import { Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
    </div>
  );
}

export default NotFoundPage;
