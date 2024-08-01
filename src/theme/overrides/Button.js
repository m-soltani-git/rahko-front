// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: Number(theme.shape.borderRadius) * 2,
        },
        containedInherit: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.grey[800],
          "&:hover": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[800],
          },
        },
        sizeLarge: {
          minHeight: 48,
        },
      },
    },
  };
}
