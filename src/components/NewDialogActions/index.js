import React from 'react';
import { alpha, useTheme, DialogActions } from '@mui/material';

export default function NewDialogActions({ isPopup = true, children }) {
  const theme = useTheme();

  const sx = !isPopup
    ? {
        m: 1,
        px: 1,
        bottom: 8,
        zIndex: 1,
        borderRadius: 2,
        position: 'sticky',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        bgcolor: alpha(theme.palette.background.paper, 0.7),
        boxShadow: theme.shadows[1],
      }
    : { px: 0, pb: 0 };

  return <DialogActions sx={sx}>{children}</DialogActions>;
}
