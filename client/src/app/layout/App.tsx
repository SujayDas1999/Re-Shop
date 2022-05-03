import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetailPage from "../../features/productDetail/ProductDetailPage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";

function App() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Header></Header>
      <Container>
        <Route path={"/"} exact component={HomePage}></Route>
        <Route path={"/catalog"} exact component={Catalog} />
        <Route path={"/catalog/:id"} component={ProductDetailPage} />
        <Route path={"/about"} component={AboutPage} />
        <Route path={"/contact"} component={ContactPage} />
      </Container>
    </>
  );
}

export default App;
