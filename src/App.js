import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Products from "./components/ProductView/Products";
import FullDetails from "./components/fulldetails/FullDetails";
import Payment from "./components/payment/Payment";
import Footer from "./components/footer/Footer";
import Cart from "./components/cart/Cart";
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";
import OrderProducts from "./components/oreder/OrderProducts";
import SearchProducts from "./components/ProductView/SearchProducts";


function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      // console.log('changed' + JSON.stringify(authuser.providerData))
      if (authuser) {
        // the user logged in / the user was logged
        dispatch({
          type: 'SET_USER',
          user: authuser,
        })
      } else {
        // the user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }

    })
  }, []);


  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/cart" element={
            <>
              <Header />
              <Cart />
            </>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/order" element={
            <>
              <Header />
              {user &&
                <OrderProducts />
              }
            </>
          } />
          <Route path="/payment" element={
            <>
              <Header />
              {user && <>
                <Payment />
              </>
              }
            </>
          } />

          {/* // Default rout  */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path={`/fashion`} element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          } />

          <Route path={`/decore`} element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          } />

          <Route path={`/brands`} element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          } />

          <Route path={`/tech`} element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          } />

          <Route path={"/search/productdetails"} element={
            <>
              <Header />
              <SearchProducts />
              <Footer />
            </>
          } />

          <Route path={`/fashion/productdetails`} element={
            <>
              <Header />
              <FullDetails />
              <Footer />
            </>
          } />

          <Route path={`/decore/productdetails`} element={
            <>
              <Header />
              <FullDetails />
              <Footer />
            </>
          } />

          <Route path={`/brands/productdetails`} element={
            <>
              <Header />
              <FullDetails />
              <Footer />
            </>
          } />

          <Route path={`/tech/productdetails`} element={
            <>
              <Header />
              <FullDetails />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
