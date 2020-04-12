import React from 'react';
import {Link} from "react-router-dom";

const CategoryItem = (props) => {
    // console.log("CATEGORY ITEM");
    // console.log(props);
    return (
        <div className="col-sm-12 col-md-4 p-3  ">
            <div className="card pt-3 border-0" style={{minHeight:150+"px"}}>
                {/*<img src={}/>*/}
                <Link className="text-decoration-none" to={{pathname:`/category/${props.id}/details`}}>
                    <h2>{props.item.name}</h2>
                </Link>
                <p>Subcategory :{props.item.subcategory === null ? " - " :  props.item.subcategory.name}</p>
                {
                    props.appUser.user !== null && (props.appUser.user.role !== "CUSTOMER")?
                        <div className="card-footer border-0">
                            <button className="btn btn-danger m-1" name={props.id} onClick={props.handleDelete.bind(this,props.id)}><i className="fa fa-trash" name={props.id}></i></button>
                            <Link className="btn btn-warning m-1" to={{pathname:`/category/${props.id}/edit`}}><span className="fa fa-pencil"></span></Link>
                        </div> : ""
                }

            </div>
        </div>
    )
};

export default CategoryItem;
