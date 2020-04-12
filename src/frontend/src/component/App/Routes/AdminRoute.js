import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function AdminRoute({component: Component, appProps, appUser, appUserCart, appUserCartProducts, ...rest}){
    console.log("APPLIED ROUTE");
    console.log(appUserCart);
    return (
        <Route {...rest} render={ (props) => (
            appUser.user !== null && appUser.user.role === "ADMIN"?
                <Component  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
                : <Redirect to={"/home"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
        )}/>
    )
}
