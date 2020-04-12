import React from 'react';

const SizeOptionItem = (props) => {
    //console.log(props);
    return (
        <option className="p-0" value={props.id} disabled={props.disabled}>{props.item.sizeId.size}</option>
    )
};

export default SizeOptionItem;
