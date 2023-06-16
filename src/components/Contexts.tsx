import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  CssBaseline,
  ThemeProvider,
  Tooltip,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { createContext } from "react";
import { ResumeData } from "../utils/models";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ToggleThemeButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const altText = `Switch to ${
    theme.palette.mode === "dark" ? "light" : "dark"
  } mode`;

  return (
    <Tooltip title={altText}>
      <IconButton
        sx={{ m: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
        aria-label={altText}
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}

export function SwitchableTheme(props: {
  children: JSX.Element | JSX.Element[];
}) {
  const initialMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#D2AB67",
          },
        },
        typography: {
          overline: {
            fontSize: 14,
          }
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const ResumeContext = createContext<ResumeData>({});
export const ResumeProvider = ResumeContext.Provider;
