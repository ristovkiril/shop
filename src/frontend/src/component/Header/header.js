import React from 'react';
import {Link, NavLink} from "react-router-dom";

import CategoryService from '../../service/CategoryService';

import CategoryItem from "./categoryItem";
import HeaderLogin from "./HeaderLogin";
import Cookies from "js-cookie";

class Header extends React.Component {

    constructor(props){
        super(props);
        // console.log("HEADER");
        // console.log(props);
        this.state = {
            'categories': this.props.appCategories.mainCategories
        }
    }

    componentDidMount() {
        this.getCategories();
        if (this.props.appUser.user !== null){
            this.getCart(this.props.appUser.user.id);
        }
    }

    getCategories(){
        CategoryService.getMainCategories().then((resp) => {
            // console.log(resp.data);
            // this.setState({
            //     'categories': resp.data
            // },() => {
            //     console.log("CATEGORIES");
            //     console.log(this.state);
            // });
            let date = new Date();

            this.setState({
                'categories': resp.data
            });

            let categories = resp.data;

            JSON.stringify(categories);

            this.props.appCategories.setMainCategories(resp.data);
            Cookies.set("mainCategories", resp.data
                , {expires: date.getDate() + 7});

            console.log(this.props.appCategories)
        });
    }

    render(){
        return(
            <div >
                {/*Navbar*/}
                <nav className="navbar navbar-expand-lg navbar-dark p-2 fixed-top ">
                    <div className="container ">
                        <div className="navbar-brand p-0">
                            <Link to={{
                                pathname: "/",
                            }} className="text-white">SHOP</Link>
                        </div>

                        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink to={{
                                        pathname: `/home`,
                                    }} className="nav-link"> HOME </NavLink>

                                </li>

                                 {/*PRODUCTS */}
                                <li className="nav-item dropdown ">

                                    <NavLink to={{pathname: `/products`}} className="nav-link"> PRODUCTS
                                        <span  className="nav-link dropdown-toggle float-right p-0 pl-1" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </span>
                                            {
                                                this.props.appCategories.mainCategories !== null ?
                                                    <div className="dropdown-menu " aria-labelledby="#navbarDropdown">
                                                        {
                                                            this.props.appCategories.mainCategories.map(c => <CategoryItem item={c}
                                                                                                             id={c.id}
                                                                                                             key={c.id}/>)
                                                        }
                                                    </div>
                                                    : ""
                                            }
                                    </NavLink>

                                </li>
                                 {/*NEWS -->*/}

                                <li className="nav-item">
                                    <NavLink to={{
                                        pathname: `/category`,
                                    }} className="nav-link">CATEGORY</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to={{
                                        pathname: `/about`,
                                    }} className="nav-link">ABOUT US</NavLink>
                                </li>

                            </ul>

                            {
                                this.props.appUserCart.userCart !== null ?
                                <div className="nav-item p-2 ">
                                    <Link to={{pathname:`/cart/`+this.props.appUserCart.userCart.id}} className={"nav-item" +
                                    " text-light"}>
                                        <h5>
                                            <span className="fa fa-shopping-cart nav-item" ></span>
                                            <span className="breadcrumb-item align-text-top small bg-danger font-weight-bold rounded-circle text-light"
                                                  style={{paddingLeft: 4+"px", paddingRight: 4 +"px", paddingTop: 0, paddingBottom: 1 + "px"}}>
                                            {this.props.appUserCartProducts.userCartProducts}
                                            </span>

                                        </h5>

                                    </Link>
                                </div>
                                : ""
                            }

                            {/*TUKA TREBA ZA LOGIN*/}
                            <div className="nav-item dropdown ">
                                <HeaderLogin appProps={this.props.appProps} appUser={this.props.appUser} appUserCart={this.props.appUserCart} />
                            </div>
                            {/*DO TUKA*/}
                        </div>
                    </div>
                </nav>
                {/*NavBar-->*/}
            </div>
        )
    }
}

export default Header;
