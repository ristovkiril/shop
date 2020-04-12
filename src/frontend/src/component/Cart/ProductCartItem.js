import React from 'react';


class ProductCartItem extends React.Component {

    constructor(props) {
        super(props);
        console.log("PRODUCT CART ITEM");
        console.log(props);
        this.state = {
            'id': props.id,
            'productSize': props.item.productSize,
            'product': props.item.productSize.productId,
            'size': props.item.productSize.sizeId,
            'quantity': props.item.quantity,

        }
    }

    render() {

        return (
            <div className="row px-3 ml-4 mr-3 ">
                <div className={"col-sm-3"}>
                    <img alt={"product"} src={this.state.product.mainImage} width={100 + "px"}/>
                </div>
                <div className={"col-sm-3"}>
                    <h4>{this.state.product.name}</h4>
                    <p>Description: {this.state.product.description}</p>
                    <p>Size :{this.state.size.size}</p>
                </div>
                <div className={"col-sm-2"}>
                    {
                        this.props.userCart === this.props.appUserCart.userCart.id ?
                            <input type="number" id={this.props.id} name={"quantity"} min={1} max={this.state.productSize.quantity} value={this.state.quantity} className={"form-control"} onChange={this.props.onChangeHandle}/>
                            : <p>{this.state.quantity}</p>
                    }
                </div>
                    {
                        this.props.userCart === this.props.appUserCart.userCart.id && !this.props.item.status ?
                            <div className={"col-sm-2"}>
                                <button type={"button"} className="btn btn-default btn-small border-0 m-1" name={this.props.id} onClick={this.props.handleDelete.bind(this,this.props.id)}><span name={this.props.id}>X</span></button>
                            </div>
                            :
                            <div className={"col-sm-2"}>
                                <button type={"button"} className="btn btn-default btn-small border-0 m-1 disabled" name={this.props.id} ><span name={this.props.id}>X</span></button>
                            </div>
                    }

            </div>
        );
    }

};

export default ProductCartItem;
