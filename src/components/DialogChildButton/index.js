import React from 'react';
import { Badge, Tooltip, IconButton } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

export default function DialogChildButton({
  title,
  onClick,
  children,
  size = 'large',
  color = 'error',
  bgcolor = 'action.hover',
  invisible = true,
  icon = <HelpOutlineRoundedIcon color={color} fontSize="small" />,
}) {
  const renderChildren = (title, onClick, children) => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        title,
        onClick,
      });
    });
  };
  return children ? (
    renderChildren(title, onClick, children)
  ) : (
    <Tooltip title={title}>
      <Badge
        color={color}
        variant="dot"
        overlap="circular"
        invisible={invisible}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <IconButton sx={{ bgcolor }} size={size} color={color} onClick={onClick}>
          {icon}
        </IconButton>
      </Badge>
    </Tooltip>
  );
}
