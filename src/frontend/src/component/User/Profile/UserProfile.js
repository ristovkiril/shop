import React from 'react';
import {Link} from "react-router-dom";


class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'id': props.appUser.user.id,
            'name': props.appUser.user.name,
            'lastName': props.appUser.user.lastName,
            'email': props.appUser.user.email,
            'phoneNumber': props.appUser.user.phoneNumber,
            'address': props.appUser.user.address
        }
    }

    render() {

        return (
            <div className="container bg-white p-3 w-md-50  text-left">
                <h3>Profile</h3>
                <div className="form-group row">
                    <label htmlFor="name" className="col-form-label col-sm-3 p-1">Name : </label>
                    <div className="col-sm-9">
                        <p>{this.state.name}</p>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-form-label col-sm-3 p-1">Last name : </label>
                    <div className="col-sm-9">
                        <p>{this.state.lastName}</p>
                    </div>
                </div>

                <div className="form-group row sizes">
                    <label htmlFor="sizes" className="col-form-label col-sm-3 p-1">Email  : </label>
                    <div className="col-sm-9">
                        <p>{this.state.email}</p>
                    </div>
                </div>

                <div className="form-group row sizes">
                    <label htmlFor="sizes" className="col-form-label col-sm-3 p-1">Phone number  : </label>
                    <div className="col-sm-9">
                        <p>{this.state.phoneNumber}</p>
                    </div>
                </div>

                <div className="form-group row sizes">
                    <label htmlFor="sizes" className="col-form-label col-sm-3 p-1">Address  : </label>
                    <div className="col-sm-9">
                        <p>{this.state.address}</p>
                    </div>
                </div>

                <div className="form-group row sizes">
                    <div className="col-sm-9 p-1">
                        <Link to={{pathname: `/profile/${this.state.id}/edit`}}>Edit profile</Link>
                    </div>
                    <div className="col-sm-9 p-1">
                        <Link to={{pathname: `/user/edit/${this.state.id}/changePassword`}}>Change password</Link>
                    </div>
                </div>

            </div>

        )
    }
}

export default UserProfile;
