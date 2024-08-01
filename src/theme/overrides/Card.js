// ----------------------------------------------------------------------

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "subtitle1" },
        subheaderTypographyProps: { variant: "body2" },
      },
      styleOverrides: {
        action: {
          margin: 0,
          alignSelf: "center",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
}
