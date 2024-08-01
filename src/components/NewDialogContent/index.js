import React from 'react';
import { DialogContent, Stack } from '@mui/material';

export default function NewDialogContent({ children }) {
  return (
    <DialogContent sx={{ p: 0, borderRadius: 2, bgcolor: 'background.paper' }}>
      {children}
    </DialogContent>
  );
}
