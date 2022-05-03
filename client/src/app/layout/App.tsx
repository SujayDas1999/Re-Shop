import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { createTheme } from "@mui/system";
import { useState } from "react";

function App() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Header></Header>
      <Container>
        <Catalog />
      </Container>
    </>
  );
}

export default App;
