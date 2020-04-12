import React from 'react';
import Moment from 'react-moment'

const OrderCartItem = (props) => {
    console.log("ORDER ITEM");
    console.log(props);


    return (
        <div className="row p-3 m-3 ">
            <div className={"col-sm-3"}>
                <p>
                    {
                    <Moment date={props.item.orderDate} format={'HH:mm DD/MM/YYYY'}/>
                    }
                </p>
            </div>
            <div className={"col-sm-3"}>
                <p>{props.item.totalPrice}</p>
            </div>
            <div className={"col-sm-3"}>
                <p>{props.item.deliveryAddress}</p>
            </div>
            <div className={"col-sm-3"}>
                <p>{props.item.delivered ? "delivered" : "not send"}</p>
            </div>
        </div>
    );
};

export default OrderCartItem;
