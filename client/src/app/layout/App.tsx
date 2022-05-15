import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetailPage from "../../features/productDetail/ProductDetailPage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerErrorComponent from "../errors/ServerErrorComponent";
import NotFoundComponent from "../errors/NotFoundComponent";

function App() {
  return (
    <>
      <ToastContainer position="top-right" hideProgressBar></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header></Header>
      <Container>
        <Switch>
          <Route path={"/"} exact component={HomePage}></Route>
          <Route path={"/catalog"} exact component={Catalog} />
          <Route path={"/catalog/:id"} component={ProductDetailPage} />
          <Route path={"/about"} component={AboutPage} />
          <Route path={"/contact"} component={ContactPage} />
          <Route path={"/server-error"} component={ServerErrorComponent} />
          <Route component={NotFoundComponent} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
