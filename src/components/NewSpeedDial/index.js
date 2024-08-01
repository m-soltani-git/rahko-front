import React, { useState } from 'react';
import { Box, IconButton, Stack, Zoom, useMediaQuery, useTheme } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default function CompHandler({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: false });
  if (!children) {
    return;
  }
  if (isMobile && Array.isArray(children)) {
    return <SpeedDial>{children}</SpeedDial>;
  }
  return children;
}

function SpeedDial({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizRoundedIcon />
      </IconButton>
      <Stack
        sx={{
          right: 58,
          height: '100%',
          position: 'absolute',
          // width: open ? 'fill-available' : 'auto',
          width: open ? '100vh' : 'auto',
          backdropFilter: 'blur(7px)',
          transition: 'all 0.5s ease',
          WebkitBackdropFilter: 'blur(7px)',
          display: open ? 'flex' : 'none',
          bgcolor: '#919eab3d',
          borderRadius: 2,
          px: 1,
          zIndex: 1
        }}
        columnGap={1}
        alignItems="center"
        direction="row-reverse"
      >
        {children.map((child, i) => (
          <Zoom
            key={i}
            in={open}
            unmountOnExit
            timeout={{ appear: (i + 1.5) * 130, enter: (i + 1.5) * 150, exit: (i + 1.5) * 170 }}
          >
            <Box>{child}</Box>
          </Zoom>
        ))}
      </Stack>
    </>
  );
}
