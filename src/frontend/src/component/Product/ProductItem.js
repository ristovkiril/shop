import React from 'react';
import {Link} from 'react-router-dom'

const ProductItem = (props) => {
    // console.log("PRODUCT ITEM");
    // console.log(props);
    return (
        <div className="col-md-4 col-lg-3 col-sm-12 p-0 my-2" style={{height:400+"px"}}>
            {
                props.item.images.length > 0 && props.item.mainImage !== "" ?
                    <div className="m-0 opacity-09" style={{background: `url(${props.item.mainImage}) center center`, backgroundSize: 'cover', height:100+"%" }}>
                        {
                            props.appUser.user !== null && props.appUser.user.role !== "CUSTOMER" ?
                                <div className="btn-group small align-top float-right m-1 ">
                                    <button className="btn btn-danger btn-sm" name={props.id} onClick={props.handleDelete.bind(this,props.id)}><i className="fa fa-trash" name={props.id}></i></button>
                                    <Link className="btn btn-warning btn-sm" to={{pathname:`/products/${props.id}/edit`}}><span className="fa fa-pencil"></span></Link>
                                </div> : ""
                        }
                        <div className="opacity-07 align-bottom bg-dark text-center w-100 p-1 m-0" style={{position:'absolute', bottom:0, opacity: '0.3'}}>
                            <h2>
                                <Link className="text-decoration-none text-white m-0 " to={{pathname:`/products/${props.id}/details`}}>
                                    {props.item.name} - {props.item.price} ден.
                                </Link>
                            </h2>
                        </div>
                    </div> :
                    <div>
                        {
                            props.appUser.user !== null && props.appUser.user.role !== "CUSTOMER"?
                                <div className="btn-group small align-top float-right m-1 ">
                                    <button className="btn btn-danger btn-sm" name={props.id} onClick={props.handleDelete.bind(this,props.id)}><i className="fa fa-trash" name={props.id}></i></button>
                                    <Link className="btn btn-warning btn-sm" to={{pathname:`/products/${props.id}/edit`}}><span className="fa fa-pencil"></span></Link>
                                </div> : ""
                        }
                        <div className="opacity-07 align-bottom bg-dark text-center w-100 p-1 m-0" style={{position:'absolute', bottom:0, opacity: '0.3'}}>
                            <h2>
                                <Link className="text-decoration-none text-white m-0 " to={{pathname:`/products/${props.id}/details`}}>
                                    {props.item.name} - {props.item.price} ден.
                                </Link>
                            </h2>
                        </div>
                    </div>
            }

        </div>
    );
};

export default ProductItem;

