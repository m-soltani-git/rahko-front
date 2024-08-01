// ----------------------------------------------------------------------

export default function MuiTableCell(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
