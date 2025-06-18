import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";
import { useThemeStore } from "./store/themeStore";
import { AppRoutes } from "./routes/AppRoutes";
import Layout from "./components/Layout";

const App = () => {
  const { mode, fontScale } = useThemeStore();
  const theme = React.useMemo(
    () => getTheme(mode, fontScale),
    [mode, fontScale]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
