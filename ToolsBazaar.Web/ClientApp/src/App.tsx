import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppTheme from "./components/AppTheme";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Layout>
        <Outlet />
      </Layout>
    </AppTheme>
  );
}
