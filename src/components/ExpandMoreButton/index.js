import React from 'react';
import { styled, Tooltip, IconButton } from '@mui/material';

const ExpandMoreButton = styled((props) => {
  const { open, close, expand, children, ...other } = props;
  return (
    <Tooltip title={expand ? close : open}>
      <IconButton size="small" color="warning" {...other}>
        {children}
      </IconButton>
    </Tooltip>
  );
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  backgroundColor: theme.palette.warning.lighter,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ExpandMoreButton;
