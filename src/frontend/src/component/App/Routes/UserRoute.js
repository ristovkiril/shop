import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function UserRoute({component: Component, appProps, appUser, appUserCart, appUserCartProducts, ...rest}){
    // console.log("APPLIED ROUTE");
    // console.log(appUser);
    return (
        <Route {...rest} render={props => (
            appUser.user !== null && appUser.user.id === props.match.params.id?
                <Component  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
                : <Redirect to={"/home"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
                )}/>
    )
}
