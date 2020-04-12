import React from 'react';
import {Link} from "react-router-dom";

import UserService from '../../../service/UserService';

import $ from 'jquery'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'lastName': '',
            'email': '',
            'phoneNumber': '',
            'address': '',
            'password': '',
            'confirmPassword': ''
        }
    }

    onChangeHandle = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validatePassword();
        });

    };

    onSubmitHandle = (e) => {
        e.preventDefault();
        if (this.validatePassword()){
            const userRequest = ({
                'name': this.state.name,
                'lastName': this.state.lastName,
                'email': this.state.email,
                'password': this.state.password,
                'phoneNumber': this.state.phoneNumber,
                'address': this.state.address
            });
            UserService.addUser(userRequest).then((resp) => {
                this.props.history.push('/login');
            }, (err) => {
                console.log(err.response);
            })
        }
    };

    validatePassword(){
        if(this.state.password !== this.state.confirmPassword) {
            $('#passwordHelp').show();
            $('#confirm-password').addClass('border-danger')
            return false;
        } else {
            $('#passwordHelp').hide();
            $('#confirm-password').removeClass('border-danger')
            return true;
        }
    }

    render() {

        return(
            <div className="container col-sm-10 col-md-8 col-lg-4 my-5 p-3 rounded bg-light">
                <div >
                    <ul className="nav nav-tabs ">
                        <li className="nav-item ">
                            <Link className="nav-link" to={{pathname:'/login'}}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled active" to={{pathname:'/register'}}>Register</Link>
                        </li>
                    </ul>
                </div>

                <form className="form-signin mt-3 text-left" onSubmit={this.onSubmitHandle}>

                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className="form-group">
                        <label htmlFor="name" className="">Name</label>
                        <input type="text" id="name" name="name" value={this.state.name} className="form-control" placeholder="Name"
                               required="true" autoFocus="" onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="">Last name</label>
                        <input type="text" id="lastname" name="lastName" value={this.state.lastName} className="form-control" placeholder="last name"
                               required="true" autoFocus="" onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="">Email</label>
                        <input type="email" id="email" name="email" value={this.state.email} className="form-control" placeholder="Email"
                               required="true" autoFocus="" onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="">Phone number</label>
                        <input type="text" id="phonenumber" name="phoneNumber" value={this.state.phoneNumber} className="form-control" placeholder="Phone number"
                               required="true" autoFocus="" onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="">Address</label>
                        <input type="text" id="address" name="address" value={this.state.address} className="form-control" placeholder="Address"
                               required="true" autoFocus="" onChange={this.onChangeHandle} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="">Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} className="form-control" placeholder="Password"
                               required="true" onChange={this.onChangeHandle}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="">Confirm password</label>

                        <input type="password" id="confirm-password" name="confirmPassword" value={this.state.confirmPassword} className="form-control" placeholder="Confirm Password"
                               required="true" onChange={this.onChangeHandle} />
                        <small id="passwordHelp" className="form-text hide text-muted">Password not match</small>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>

            </div>
        )
    }

};

export default Register;
