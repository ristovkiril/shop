import React from 'react';
import {Link} from 'react-router-dom'

const CategoryItem = (props) => {
    return (
        <div>
            <Link to={{pathname:`/products/${props.item.id}`}} className="dropdown-item">{props.item.name}</Link>
        </div>
    );
};

export default CategoryItem;
