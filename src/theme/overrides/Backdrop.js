import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  const varLow = alpha(theme.palette.grey[900], 0.9);
  const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: alpha(theme.palette.grey[900], 0.8),
          // backdropFilter: "blur(6px)",
          // WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
          background: [
            `rgb(22,28,36)`,
            `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          ],
          // "&.MuiBackdrop-invisible": {
          //   background: "transparent",
          // },
        },
        invisible: {
          background: "transparent",
        },
      },
    },
  };
}
