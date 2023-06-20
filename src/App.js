import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import Header from "./components/header";
import Main from "./pages/Main";
import ErrorBoundary from "./components/ErrorBoundary";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
