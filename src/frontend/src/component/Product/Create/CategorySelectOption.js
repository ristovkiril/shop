import React from 'react';

const CategorySelectOption = (props) => {
    return (
        <option value={props.id} selected={props.select}>{props.item.name}</option>
    )
};

export default CategorySelectOption;
