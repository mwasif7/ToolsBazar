import { ReactNode } from "react";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "./ToggleMode";

type AppThemeProps = {
  children: ReactNode;
};

export default function AppTheme({ children }: AppThemeProps) {
  
   const [mode, setMode] = React.useState<"light" | "dark">("light");
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
         },
       }),
     [mode]
   );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
