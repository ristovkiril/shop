import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'react-moment'

const AllOrderCartItem = (props) => {
    console.log("ORDER ITEM");
    console.log(props);

    return (
        <div className="row p-3 m-3 ">
            <div className={"col-sm-2"}>
                <Link to={{pathname: `/cart/${props.id}`}}>{props.item.user.email}</Link>
            </div>
            <div className={"col-sm-3"}>
                {
                    <Moment date={props.item.orderDate} format={'HH:mm DD/MM/YYYY'}/>
                }
            </div>
            <div className={"col-sm-2"}>
                <p>{props.item.totalPrice}</p>
            </div>
            <div className={"col-sm-3"}>
                <p>{props.item.deliveryAddress}</p>
            </div>
            <div className={"col-sm-2"}>
                <select id={props.id} name={props.id} className="form-control" onChange={props.onChangeHandle}>
                    <option className="p-0" value={true} selected={props.item.delivered? true:false}>delivered</option>
                    <option className="p-0" value={false} selected={props.item.delivered? false:true}>not send</option>
                </select>
            </div>
        </div>
    );
};

export default AllOrderCartItem;
