import React from 'react';
import {Link, useHistory} from "react-router-dom";

import Cookies from 'js-cookie';

export default function HeaderLogin ({appProps, appUser, appUserCart}){
    let history = useHistory();
    // console.log(appProps);
    function onClickHandle(e)  {

        appProps.userHasAuthenticated(false);
        appUser.setUser(null);
        appUserCart.setUserCart(null);

        Cookies.remove("user");
        Cookies.remove("userCart");
        Cookies.remove("mainCategories");
        Cookies.remove("userCartProducts");

        history.push("/login");
        console.log(history.push("/login"))
    }

    return (
            appProps.isAuthenticated && appUser.user !== null?
                <div className="nav-link text-light">
                    <span className="nav-link dropdown-toggle float-right p-0 pl-1" id="navbarDropdown" role="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {appUser.user.email}
                    </span>

                    <div className="dropdown-menu " aria-labelledby="#navbarDropdown">
                        <div className="dropdown-item">
                            <Link to={{pathname: `/profile/${appUser.user.id}`}} className="nav nav-link text-decoration-none">Profile</Link>
                        </div>
                        <div className="dropdown-item">
                            <Link to={{pathname: `/user/orders/${appUser.user.id}`}} className="nav nav-link text-decoration-none">My Orders</Link>
                        </div>
                        {
                            appUser.user.role !== "CUSTOMER" ?
                                <div className="dropdown-item">
                                    <Link to={{pathname: `/orders`}} className="nav nav-link text-decoration-none">Orders</Link>
                                </div>
                                :""
                        }
                        {
                            appUser.user.role === "ADMIN" ?
                                <div className="dropdown-item">
                                    <Link to={{pathname: `/user/edit/role`}} className="nav nav-link text-decoration-none">Add to role</Link>
                                </div>
                                :""
                        }
                        <div className={"dropdown-item border-top"}>
                            <button className="nav nav-link btn btn-link" id="logout" onClick={onClickHandle}>Logout</button>
                        </div>
                    </div>
                </div>
                :
                <div className="nav nav-link text-light">
                    <span className="nav nav-link dropdown-toggle float-right p-0 pl-1" id="navbarDropdown" role="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        LOGIN
                    </span>
                    <div className="dropdown-menu " aria-labelledby="#navbarDropdown">
                        <div className="dropdown-item">
                            <Link to={{pathname: `/login`}}  className="nav nav-link text-decoration-none">Login</Link>
                        </div>
                        <div className={"dropdown-item"}>
                            <Link to={{pathname: `/register`}}  className="nav nav-link text-decoration-none">Register</Link>
                        </div>
                    </div>
                </div>
    )
}
