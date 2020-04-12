import React from 'react';

import CartService from '../../../service/CartService';
import OrderCartItem from "./OrderCartItem";

class UserOrders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'id': props.appUser.user.id,
            'orders': []
        }
    }

    componentDidMount() {
        this.getAllOrders();
    }

    getAllOrders(){
        CartService.getAllOrdersFromUser(this.state.id).then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'orders': resp.data
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})

        }, (err) => {
            alert("ERROR");
            console.log(err.response.statusText);
        })
    }


    render() {
        return (
            <div className="container mt-5 bg-white">
                <div className="row pt-5 ml-md-4 mr-md-3 ">
                    <div className={"col-sm-3"}>
                        <h5>Order date</h5>
                    </div>
                    <div className={"col-sm-3"}>
                        <h5>Total Price</h5>
                    </div>
                    <div className={"col-sm-3"}>
                        <h5>Address</h5>
                    </div>
                    <div className={"col-sm-3"}>
                        <h5>Status</h5>
                    </div>


                </div>
                <div className="mt-5 border-top py-3 border-bottom">
                {
                this.state.orders.length === 0 ?
                <h3 className="p-5">Orders not found</h3>
                : this.state.orders.map(p => <OrderCartItem appProps={this.props.appProps} appUser={this.props.appUser} item={p} key={p.id} id={p.id} value={p.quantity} onChangeHandle={this.onChangeHandle} handleDelete={this.handleDelete}/>)
                }
                </div>

            </div>
        )
    }
}

export default UserOrders;
