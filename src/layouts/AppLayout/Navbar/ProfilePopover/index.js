import { useState } from "react";
import { alpha } from "@mui/material/styles";

import {
  Menu,
  Stack,
  Avatar,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

import { signOut } from "toolkits/redux/auth";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function ProfilePopover() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    language: { language, direction },
  } = useSelector((state) => state.setting);
  const { userInfo } = useSelector((state) => state.auth);
  const { username, roles } = userInfo;

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      dispatch(signOut());
      onClose();
    } catch (error) {}
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        color="warning"
        aria-describedby={id}
        onClick={onOpen}
        sx={{
          p: 0,
          width: 41,
          height: 41,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
            },
          }),
        }}
      >
        <Avatar
          alt="profile"
          src="/assets/images/avatars/avatar_18.jpg"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </IconButton>

      <Menu
        id={id}
        open={open}
        dir={direction}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack p={1}>
          <Typography variant="subtitle1">{username}</Typography>
          <Stack direction="row" columnGap={1} py={1}>
            {roles.map((role) => (
              <Typography
                px={2}
                py={0.5}
                key={role.id}
                fontSize={12}
                borderRadius={3}
                lineHeight={1.5}
                color="error.dark"
                variant="subtitle2"
                bgcolor="error.lighter"
              >
                {role.title}
              </Typography>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          خروج از سامانه
        </MenuItem>
      </Menu>
    </>
  );
}
