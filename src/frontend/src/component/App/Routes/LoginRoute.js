import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function LoginRoute({component: Component, appProps, appUser, appUserCart, appUserCartProducts, ...rest}){
    // console.log("APPLIED ROUTE");
    // console.log(appUser);
    return (
        <Route {...rest} render={props => (
            !appProps.isAuthenticated?
                <Component  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
                : <Redirect to={"/home"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
        )}/>
    )
}
