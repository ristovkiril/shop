import React from 'react';

import UserService from '../../../service/UserService'
import $ from "jquery";
import Cookies from "js-cookie";

class UserChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'userId': props.appUser.user.id,
            'oldPassword': "",
            'newPassword': "",
            'confirmPassword': ""
        }
    }

    onChangeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {});
    };

    validatePassword(){
        if(this.state.newPassword !== this.state.confirmPassword) {
            $('#passwordHelp').show();
            $('#confirm-password').addClass('border-danger')
            return false;
        } else {
            $('#passwordHelp').hide();
            $('#confirm-password').removeClass('border-danger')
            return true;
        }
    }

    onSubmitHandle = (e) => {
        e.preventDefault();

        if(this.validatePassword()) {
            const userRequest = {
                'userId': this.state.userId,
                'newPassword': this.state.newPassword,
                'oldPassword': this.state.oldPassword
            };

            let token = Cookies.get("token");
            //const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

            UserService.changePassword(this.state.userId, userRequest, token).then((resp) => {
                this.props.appUser.setUser(resp.data);

                this.props.history.push(`/profile/${resp.data.id}`)
            }, (err) => {
                alert("error");
                console.log(err.response.status);
            })
        }
    };

    render() {

        return (
            <div className="container bg-white p-3 w-md-50  text-left">
                <h3>Change Password</h3>
                <form onSubmit={this.onSubmitHandle}>
                    <div className="form-group row py-3">
                        <label htmlFor="oldPassword" className="col-form-label col-sm-3 p-1">Old password : </label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="oldPassword" name="oldPassword" placeholder="Password" value={this.state.oldPassword} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="newPassword" className="col-form-label col-sm-3 p-1">New password : </label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="newPassword" name="newPassword" placeholder="New Password" value={this.state.newPassword} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="confirm-password" className="col-form-label col-sm-3 p-1">Confirm password : </label>

                        <div className="col-sm-9">
                            <input type="password" id="confirm-password" name="confirmPassword" value={this.state.confirmPassword} className="form-control" placeholder="Confirm Password"
                                   required="true" onChange={this.onChangeHandle} />
                            <small id="passwordHelp" className="form-text hide text-muted">Password not match</small>
                        </div>

                    </div>


                    <div className="form-group row sizes">
                        <div className="col-sm-9">
                            <button type="submit" className="btn btn-success" >Change password</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default UserChangePassword;
