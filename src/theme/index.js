import { useMemo } from "react";

import {
  createTheme,
  responsiveFontSizes,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import shape from "./shape";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";

import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";

import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { faIR } from "@mui/material/locale";

// ----------------------------------------------------------------------

export default function MUIThemeProvider({ children }) {
  const {
    theme: { color, mode },
    language: { language, direction },
  } = useSelector((state) => state.setting);

  const themeOptions = useMemo(
    () => ({
      palette: palette(mode, color),
      shape,
      typography,
      shadows: shadows(mode),
      customShadows: customShadows(),
      direction,
    }),
    [direction, mode]
  );

  let theme = createTheme(themeOptions, faIR);
  theme = responsiveFontSizes(theme);
  theme.components = componentsOverride(theme);

  return (
    <div dir={direction}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}
