import React from 'react';

import UserService from '../../../service/UserService'
import UserOption from "./UserOption";

import $ from 'jquery'

import Cookies from 'js-cookie';


class AddToRole extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'users': [],
            'userId': '',
            'role': ''
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers(){
        UserService.getCustomersAndModerator().then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'users': resp.data
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                let id = $(`option:selected`).val();
                let role = 'CUSTOMER';
                let newValue;
                this.state.users.forEach(u => {
                    if (u.userId === id){
                        role = u.role;
                    }
                });

                $(`input[value='${role}']`).prop('checked', true);

                newValue = {
                    'userId': id,
                    'role': role
                };

                this.setState((prevState) => {
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState;
                })
            })
        }, (err) => {
            console.log(err.response);
        })
    }

    onChangeHandle = (e) => {
        let value = e.target.value;
        let newValue;

        if(e.target.name === 'userId'){
            let role = 'CUSTOMER';
            this.state.users.forEach(u => {
                if (u.userId === value){
                    role = u.role;
                }
            });

            $(`input[value='${role}']`).prop('checked', true);

            newValue = {
                'userId': value,
                'role': role
            }
        }
        else{

            newValue = {
                'role': value
            }
        }
        console.log(newValue);

        this.setState((prevState) => {
            const newState = {
                ...prevState,
                ...newValue
            };

            return newState;
        }, () => {console.log(this.state)})
    };

    onSubmitHandle = (e) => {
        e.preventDefault();
        let token = Cookies.get("token");
        //const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

        const request = {
            'userId': this.state.userId,
            'role': this.state.role
        };
        console.log(request);

        UserService.changeRole(request, token).then((resp) => {
            alert("User role is changed");
        }, (err) => {
            alert("error");
            console.log(err.response);
        })
    };

    render() {
        return(
            <div className="container col-sm-10 col-md-4 col-lg-4 my-5 p-3 rounded bg-light">
                <form className="form-signin mt-3 text-left" onSubmit={this.onSubmitHandle}>
                    <h1 className="h3 mb-3 font-weight-normal">Add to role</h1>
                    <div className="form-group">
                        <label htmlFor="email" >Email address</label>

                        <div className="col-sm-6 p-0">
                            <select id="userId" name="userId" className="form-control" onChange={this.onChangeHandle}>
                            {
                                this.state.users.map(s => <UserOption item={s} key={s.userId} id={s.userId} role={s.role} onChange={this.onChangeHandle}/>)
                            }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="m-1">Role:</label>
                        <div className="col-12 pl-4">
                            <input type="radio" id="CUSTOMER" name="role" className="form-check-input "  value={"CUSTOMER"} onChange={this.onChangeHandle} /> <label htmlFor={"role"}>Customer</label>
                            <br />
                            <input type="radio" id="MODERATOR" name="role" className="form-check-input " value={"MODERATOR"} onChange={this.onChangeHandle} /> <label htmlFor={"role"}>MODERATOR</label>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Save</button>

                </form>

            </div>
        )
    }
}

export default AddToRole;
