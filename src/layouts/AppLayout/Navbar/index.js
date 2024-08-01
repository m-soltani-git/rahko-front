import { useTour } from "@reactour/tour";
import { useEffect, useState } from "react";
import { Box, Stack, AppBar, IconButton, Typography } from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

import ThemePopover from "./ThemePopover";
import ProfilePopover from "./ProfilePopover";
import LanguagePopover from "./LanguagePopover";

const drawerWidth = 320;
export default function Navbar({ onOpenSidebar }) {
  const { setIsOpen } = useTour();
  const openTour = () => setIsOpen(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return (
    <AppBar
      elevation={3}
      sx={{
        m: 1,
        borderRadius: 2,
        bgcolor: "background.default",
        width: {
          xs: "calc(100% - 16px)",
          lg: `calc(100% - ${drawerWidth}px - 16px)`,
        },
      }}
    >
      {!isOnline && (
        <Typography
          mx={1}
          px={1}
          fontWeight="bold"
          textAlign="center"
          color="error.main"
          bgcolor="warning.light"
          borderRadius="0 0 16px 16px"
        >
          لطفا دسترسی اینترنت خود را بررسی کنید!
        </Typography>
      )}
      <Stack direction="row" alignItems="center" px={1} minHeight={64}>
        <IconButton color="primary" size="medium" onClick={onOpenSidebar}>
          <MenuRoundedIcon fontSize="small" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack columnGap={1} direction="row" alignItems="center">
          {/* <IconButton color="warning" onClick={openTour}>
            <HelpOutlineRoundedIcon fontSize="small" />
          </IconButton> */}
          <ThemePopover />
          <LanguagePopover />
          <ProfilePopover />
        </Stack>
      </Stack>
    </AppBar>
  );
}
