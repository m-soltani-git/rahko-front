import { IconButton } from "@mui/material";
import { setTheme } from "toolkits/redux/setting";
import { useDispatch, useSelector } from "react-redux";

import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
// ----------------------------------------------------------------------

export default function ThemePopover() {
  const dispatch = useDispatch();
  const {
    theme: { color, mode },
  } = useSelector((state) => state.setting);

  const changeTheme = () => {
    if (mode === "light") {
      dispatch(setTheme({ color: "secondary", mode: "dark" }));
    } else {
      dispatch(setTheme({ color: "primary", mode: "light" }));
    }
  };

  return (
    <>
      <IconButton color={color} size="medium" onClick={changeTheme}>
        {mode === "light" ? (
          <NightsStayRoundedIcon fontSize="small" />
        ) : (
          <LightModeRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </>
  );
}
