import { useState } from "react";
import { alpha } from "@mui/material/styles";

import {
  Menu,
  Avatar,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { setLanguage } from "toolkits/redux/setting";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

const languages = {
  en: {
    value: "en",
    label: "English",
    icon: "/assets/icons/en.webp",
  },
  fa: {
    value: "fa",
    label: "فارسی",
    icon: "/assets/icons/fa.webp",
  },
};

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    language: { language, direction },
  } = useSelector((state) => state.setting);

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (data) => {
    if (data === "fa") {
      dispatch(setLanguage({ language: "fa", direction: "rtl" }));
    } else {
      dispatch(setLanguage({ language: "en", direction: "ltr" }));
    }
    onClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        size="medium"
        color="default"
        aria-describedby={id}
        onClick={onOpen}
        sx={{
          p: 1.2,
          width: 41,
          height: 41,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Avatar
          src={languages[language]?.icon}
          alt={languages[language]?.label}
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
        {Object.keys(languages).map((key) => (
          <MenuItem
            key={languages[key].value}
            selected={languages[key].value === language}
            onClick={() => changeLanguage(languages[key].value)}
          >
            <ListItemIcon sx={{ mr: 1 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={languages[key].label}
                src={languages[key].icon}
              />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "body2" }}>
              {languages[key].label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
