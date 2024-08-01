// ----------------------------------------------------------------------

export default function MuiMenuItem(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
  };
}
