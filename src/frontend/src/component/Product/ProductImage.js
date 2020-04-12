import React from 'react'

const ProductImage = (props) => {
    console.log("Product Image");
    console.log(props);

    return(
        <div className="col-md-4 my-1">
            <div className="card p-0 my-1">
                <div className="card-body p-0"
                     style={{background: `url(${props.image}) center center`, backgroundSize:"cover", width:100+"%", height:200+"px", maxHeight:300+"px"}}
                     onClick={props.showButtons? props.onClick.bind(this,props.id): props.onClick.bind(this,props.image)}>
                    {/*<img alt={"product"} src={props.image}  style={{maxHeight:350+"px", maxWidth: 100+"%"}}*/}
                         {/*width={100 +"%"} className="center img-fluid p-0" onClick={props.showButtons ?*/}
                        {/*props.onClick.bind(this, props.id) : props.onClick.bind(this, props.image)} />*/}
                </div>
                {
                    props.showButtons ?
                    <div className="card-footer py-1">
                        <div className="btn-group">
                            <button type={"button"} className="btn btn-success btn-small" id={props.id} name={props.id}
                                    value={props.image} onClick={props.onClick.bind(this, props.id)}>Main image
                            </button>
                            <button type={"button"} className="btn btn-danger btn-small" id={props.id} name={props.id}
                                    value={props.id} onClick={props.onRemove.bind(this, props.id)}>Remove
                            </button>
                        </div>
                    </div>:""
                }
            </div>
        </div>
    );

};

export default ProductImage;
