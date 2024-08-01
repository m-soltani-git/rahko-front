import React from 'react';
import { Stack, Tooltip, Typography, IconButton, DialogTitle } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function NewDialogTitle({ title, onClose, isPopup = true, actions, children }) {
  return (
    <DialogTitle component="div" sx={{ p: isPopup ? 0 : 1, pb: 1 }}>
      <Stack
        pb={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        display={isPopup ? 'flex' : 'none'}
      >
        <Title title={title} />
        <Stack direction="row" columnGap={0.5}>
          {actions}
          <Tooltip title="بازگشت">
            <IconButton sx={{ bgcolor: 'action.hover' }} size="small" color="error" onClick={onClose}>
              <ArrowBackRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {children}
    </DialogTitle>
  );
}

function Title({ title }) {
  if (typeof title === 'string') {
    return (
      <Typography variant="subtitle1" color="#fff">
        {title}
      </Typography>
    );
  }
  return title;
}
