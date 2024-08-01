import { alpha } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

// ----------------------------------------------------------------------

export default function MuiOutlinedInput(theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },
      },
    },
  };
}
