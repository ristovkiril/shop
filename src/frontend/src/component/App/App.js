import React, { useState, useEffect } from "react";

import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';

import Header from "../Header/header";
import Footer from "../Footer/footer";
import Routes from "./Routes/Routes";

import Cookies from 'js-cookie';

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userCart, setUserCart] = useState(null);
    const [mainCategories, setMainCategories] = useState(null);
    const [userCartProducts, setUserCartProducts] = useState(0);

    useEffect(()=> {
        let cookie_user = Cookies.get("user");
        let cookie_cart = Cookies.get("userCart");
        let cookie_categories = Cookies.get("mainCategories");
        let cookie_products = Cookies.get("userCartProducts");

        let tok = Cookies.get("token");

        if (tok !== undefined && tok !== null) {
            //const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

            if (cookie_user !== undefined && cookie_user !== null
                && cookie_cart !== undefined && cookie_cart !== null
                && cookie_products !== undefined && cookie_products !== null) {
                //USER
                cookie_user = JSON.parse(cookie_user.replace(new RegExp(/'/g), '"'));

                userHasAuthenticated(true);
                setUser(cookie_user);
                //CART
                cookie_cart = JSON.parse(cookie_cart.replace(new RegExp(/'/g), '"'));

                setUserCart(cookie_cart);
                //PRODUCTS
                cookie_products = JSON.parse(cookie_products.replace(new RegExp(/'/g), '"'));

                console.log("Cookie products");
                console.log(cookie_products);

                setUserCartProducts(cookie_products);

            }
        }
        if(cookie_categories !== undefined && cookie_categories !== null){
            //CATEGORIES
            cookie_categories = JSON.parse(cookie_categories.replace(new RegExp(/'/g), '"'));

            setMainCategories(cookie_categories);
        }

    },[]);

    console.log(userCart);
  return (
      <Router>
          <div className="App">
            <Header appProps={{isAuthenticated, userHasAuthenticated}} appUser={{user, setUser}} appUserCart={{userCart, setUserCart}} appUserCartProducts={{userCartProducts, setUserCartProducts}} appCategories={{mainCategories,setMainCategories}}/>

            <div className="mt-5 container-fluid bg-transparent bg-white" style={{minHeight: 1000 + 'px'}}>
                <Routes appProps={{ isAuthenticated, userHasAuthenticated }} appUser={{user, setUser}} appUserCart={{userCart, setUserCart}} appUserCartProducts={{userCartProducts, setUserCartProducts}} appCategories={{mainCategories,setMainCategories}} />
            </div>
            <Footer/>
          </div>
      </Router>

  );
}

export default App;
