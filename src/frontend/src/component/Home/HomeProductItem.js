import React from 'react';
import {Link} from 'react-router-dom'

const HomeProductItem = (props) => {
    // console.log("PRODUCT ITEM");
    // console.log(props);
    return (
        <div className="col-md-4 col-sm-12 float-left p-0 mx-0 my-2" style={{height:400+"px"}}>
            {
                props.item.images.length > 0 && props.item.mainImage !== "" ?
                    <div className="m-0 opacity-09" style={{background: `url(${props.item.mainImage}) center center`, backgroundSize: 'cover', height:100+"%" }}>
                        <div className="opacity-07 align-bottom bg-dark text-center w-100 p-1 m-0" style={{position:'absolute', bottom:0, opacity: '0.3'}}>
                            <h2>
                                <Link className="text-decoration-none text-white m-0 " to={{pathname:`/products/${props.id}/details`}}>
                                    {props.item.name} - {props.item.price} ден.
                                </Link>
                            </h2>
                        </div>
                    </div> :
                        <div className="opacity-07 align-bottom bg-dark text-center w-100 p-1 m-0" style={{position:'absolute', bottom:0, opacity: '0.3'}}>
                            <h2>
                                <Link className="text-decoration-none text-white m-0 " to={{pathname:`/products/${props.id}/details`}}>
                                    {props.item.name} - {props.item.price} ден.
                                </Link>
                            </h2>
                        </div>
            }

        </div>
    );
};

export default HomeProductItem;
