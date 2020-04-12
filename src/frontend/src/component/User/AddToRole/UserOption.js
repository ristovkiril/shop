import React from 'react';

const UserOption = (props) => {
    //console.log(props);
    return (
        <option className="p-0" value={props.id} >{props.item.email}</option>
    )
};

export default UserOption;
