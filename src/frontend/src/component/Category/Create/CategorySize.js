import React from 'react';

const CategorySize = (props) => {



    return (
        <div className="input-group p-2 row">
            <input id={props.id} name="sizeName" type="text" className="form-control"
                   value={props.value} onChange={props.onChange} required={true} minLength={1} aria-label="size" aria-describedby="remove" />
            <div className="input-group-append border rounded-right">
                <button id="remove" type="button" name="remove-button" className="btn btn-default px-2 py-0" onClick={props.onClick.bind(this,props.id)}>x</button>
            </div>
        </div>
    )

};

export default CategorySize;
