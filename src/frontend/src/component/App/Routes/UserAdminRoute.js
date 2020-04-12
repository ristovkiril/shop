import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export default function UserAdminRoute({component: Component, appProps, appUser, appUserCart, appUserCartProducts, ...rest}){
    console.log("APPLIED ROUTE");
    console.log(appUserCart);
    return (
        <Route {...rest} render={ (props) => (
            appUser.user !== null && (appUserCart.userCart.id === props.match.params.id || (appUser.user.role === "MODERATOR" || appUser.user.role === "ADMIN"))?
                <Component  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts}/>
                : <Redirect to={"/home"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />
        )}/>
    )
}
