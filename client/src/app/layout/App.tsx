import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetailPage from "../../features/productDetail/ProductDetailPage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerErrorComponent from "../errors/ServerErrorComponent";
import NotFoundComponent from "../errors/NotFoundComponent";
import Basketpage from "../../features/basket/Basketpage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import Checkout from "../../features/checkout/Checkout";

function App() {
  const storeContext = useStoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => storeContext?.setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [storeContext?.setBasket]);

  if (loading)
    return (
      <LoadingComponent message="Setting up the application .... Please Wait ..." />
    );

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
          <Route path={"/basket-page"} component={Basketpage} />
          <Route path={"/checkout"} component={Checkout} />
          <Route component={NotFoundComponent} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
