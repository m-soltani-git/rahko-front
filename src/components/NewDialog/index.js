import React from 'react';
import { Box, Dialog, useMediaQuery, useTheme } from '@mui/material';

export default function NewDialog({ open, label, onClose, maxWidth="md", children }) {
  const theme = useTheme();  
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      fullWidth
      dir="rtl"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      PaperComponent={Box}
      fullScreen={fullScreen}
      aria-labelledby={`${label}-dialog-title`}
      aria-describedby={`${label}-dialog-description`}
      PaperProps={{
        sx: {
          p: 2,
        },
      }}
    >
      {children}
    </Dialog>
  );
}
