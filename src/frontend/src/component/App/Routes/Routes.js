import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CreateProduct from "../../Product/Create/CreateProduct";
import EditProduct from "../../Product/Edit/EditProduct";
import DetailsProduct from "../../Product/Details/DetailsProduct";
import ProductIndex from "../../Product/productIndex";
import CreateCategory from "../../Category/Create/CreateCategory";
import EditCategory from "../../Category/Edit/EditCategory";
import CategoryIndex from "../../Category/CategoryIndex";
import Login from "../../User/Login/Login";
import Register from "../../User/Register/Register";

import AppliedRoute from './AppliedRoute'
import UserCart from "../../Cart/UserCart";
import UserProfile from "../../User/Profile/UserProfile";
import EditProfile from "../../User/Profile/EditProfile";
import UserChangePassword from "../../User/Profile/UserChangePassword";
import AllOrders from "../../User/Orders/AllOrders/AllOrders";
import Home from "../../Home/home";
import UserRoute from "./UserRoute";
import UserAdminRoute from "./UserAdminRoute";
import UserOrders from "../../User/Orders/UserOrders";
import LoginRoute from "./LoginRoute";
import DetailsCategory from "../../Category/Details/DetailsCategory";
import AddToRole from "../../User/AddToRole/AddToRole";
import AdminRoute from "./AdminRoute";
import AboutUs from "../../AboutUs/AboutUs";

export default function Routes ({appProps, appUser, appUserCart, appUserCartProducts, appCategories}){
    console.log(appUser);

    return (

        <Switch>

            <AppliedRoute path={'/products/create'} exact component={CreateProduct} appProps={appProps} appUser={appUser} appUserCart={appUserCart} role={"MODERATOR"} />
            <AppliedRoute path={'/products/:id/edit'} exact component={EditProduct} appProps={appProps} appUser={appUser} appUserCart={appUserCart} role={"MODERATOR"} />
            <Route path={'/products/:id/details'} exact component={(props) => <DetailsProduct {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />} />
            <Route path={'/products/:id'} exact component={(props) => <ProductIndex {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />
            <Route path={'/products'} exact component={(props) => <ProductIndex {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />

            <AppliedRoute path={'/category/create'} exact component={CreateCategory} appProps={appProps} appUser={appUser} appUserCart={appUserCart} role={"MODERATOR"} appCategories={appCategories}/>
            <AppliedRoute path={'/category/:id/edit'} exact component={EditCategory} appProps={appProps} appUser={appUser} appUserCart={appUserCart} role={"MODERATOR"} />
            <Route path={'/category/:id/details'} exact component={(props) => <DetailsCategory {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts}/>} />
            <Route path={'/category'} exact component={(props) => <CategoryIndex  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />

            <AdminRoute path={'/user/edit/role'} exact component={(props) => <AddToRole  {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />

            <UserAdminRoute path={'/cart/:id'} exact component={UserCart} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            {/*PROFILE*/}
            <UserRoute path={'/profile/:id'} exact component={UserProfile} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            <UserRoute path={'/profile/:id/edit'} exact component={EditProfile} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            <UserRoute path={`/user/edit/:id/changePassword`} exact component={UserChangePassword} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            <UserRoute path={`/user/orders/:id`}  exact component={UserOrders} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />


            {/*PROFILE END*/}

            <Route path={'/home'} exact component={(props) => <Home {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />

            <AppliedRoute path={'/orders'} exact component={AllOrders} appProps={appProps} appUser={appUser} appUserCart={appUserCart} app role={"MODERATOR"} appCategories={appCategories}/>

            <LoginRoute path={'/login'} exact component={Login} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            <LoginRoute path={'/register'} exact component={Register}  appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />

            <Route path={'/about'} exact component={(props) => <AboutUs {...props} appProps={appProps} appUser={appUser} appUserCart={appUserCart} />} />


            <Redirect to={"/home"} appProps={appProps} appUser={appUser} appUserCart={appUserCart} appUserCartProducts={appUserCartProducts} />


        </Switch>
    )
}
