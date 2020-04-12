import React from 'react'

const SizeItem = (props) => {
  return(
        <div className=" input-group row px-2">
            <div className="input-group-prepend ">
                <input type="text" name="size" value={props.item.name} className="input-group-text " />
            </div>
            <input id={props.id} name="quantity" type="number"  className="form-control " min={0} value={props.value} onChange={props.onChange} required={true}/>
        </div>
    );

};

export default SizeItem;
