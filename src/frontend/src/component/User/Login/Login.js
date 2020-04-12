import React from 'react';
import {Link} from "react-router-dom";

import UserService from '../../../service/UserService';

import Cookies from 'js-cookie';

class Login extends React.Component {

    constructor(props) {
        super(props);

        // console.log("LOGIN");
        // console.log(props);
        this.state = {
            'email': '',
            'password': '',
            'errorMessage': ''
        }
    }

    onChangeHandle = (e) =>{


        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        UserService.login(this.state).then((resp) => {
            if(resp.data !== null && resp.data.user !== null && resp.data.cart !== null){
                //USER
                this.props.appProps.userHasAuthenticated(true);
                this.props.appUser.setUser(resp.data.user);

                let date = new Date();

                Cookies.set("user", resp.data.user, {expires: date.getDate() + 7});
                //Cart
                this.props.appUserCart.setUserCart(resp.data.cart);

                Cookies.set("userCart", resp.data.cart, {expires: date.getDate() + 7});
                //Products
                console.log("LOGGED IN")
                console.log(resp.data);
                this.props.appUserCartProducts.setUserCartProducts(resp.data.totalProducts);
                Cookies.set("userCartProducts", resp.data.totalProducts, {expires: date.getDate() + 7});


                this.props.history.push("/");
            }else {
                this.setState((prevState) => {
                    const newValue = {
                        'errorMessage': 'Wrong email or password'
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };
                    return newState;
                })
            }
        }, (err) => {
            this.setState((prevState) => {
                const newValue = {
                    'errorMessage': 'Wrong email or password'
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };
                return newState;
            })
        });
    };

    render() {

        return(
            <div className="container col-sm-10 col-md-8 col-lg-4 my-5 p-3 rounded bg-light">
                <div >
                    <ul className="nav nav-tabs ">
                        <li className="nav-item">
                            <Link className="nav-link disabled active" to={{pathname:'/login'}}>Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={{pathname:'/register'}}>Register</Link>
                        </li>
                    </ul>
                </div>

                <form className="form-signin mt-3 text-left" onSubmit={this.onSubmitHandle}>
                    <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
                    <p id="error" className="text-danger">{this.state.errorMessage}</p>
                    <div className="form-group">
                        <label htmlFor="email" >Email address</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Email address"
                                required={true} autoFocus="" value={this.state.email} onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="m-1">Password</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                                       required={true} minLength={5} onChange={this.onChangeHandle} />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Login</button>

                </form>

            </div>
        )
    }

};

export default Login;
