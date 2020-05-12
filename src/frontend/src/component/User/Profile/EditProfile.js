import React from 'react';

import UserService from '../../../service/UserService'
import Cookies from "js-cookie";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'id': props.appUser.user.id,
            'name': props.appUser.user.name,
            'lastName': props.appUser.user.lastName,
            'email': props.appUser.user.email,
            'phoneNumber': props.appUser.user.phoneNumber,
            'address': props.appUser.user.address,
        }
    }

    onChangeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmitHandle = (e) => {
      e.preventDefault();

        let token = Cookies.get("token");
        // const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

        const userRequest = {
            'name': this.state.name,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'phoneNumber': this.state.phoneNumber,
            'address': this.state.address,
        };

        UserService.updateUser(this.state.id, userRequest, token).then((resp) => {
            this.props.appUser.setUser(resp.data);

            this.props.history.push(`/profile/${resp.data.id}`)
        }, (err) => {
            alert("error");
            console.log(err.response.status);
        })

    };

    render() {

        return (
            <div className="container bg-white p-3 w-md-50  text-left">
                <h3>Edit profile</h3>
                <form onSubmit={this.onSubmitHandle}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-sm-3 p-1">Name : </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="name" name="name" value={this.state.name} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-form-label col-sm-3 p-1">Last name : </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>

                    <div className="form-group row sizes">
                        <label htmlFor="email" className="col-form-label col-sm-3 p-1">Email  : </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="email" name="email" value={this.state.email} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>

                    <div className="form-group row sizes">
                        <label htmlFor="phoneNumber" className="col-form-label col-sm-3 p-1">Phone number  : </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>

                    <div className="form-group row sizes">
                        <label htmlFor="address" className="col-form-label col-sm-3 p-1">Address  : </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="address" name="address" value={this.state.address} required={true} onChange={this.onChangeHandle} />
                        </div>
                    </div>

                    <div className="form-group row sizes">
                        <div className="col-sm-9">
                            <button type="submit" className="btn btn-success" >Save</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default UserProfile;
