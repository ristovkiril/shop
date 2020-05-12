import React from 'react';

import CartService from '../../service/CartService';
import ProductCartItem from "./ProductCartItem";

import Cookies from 'js-cookie'

class UserCart extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);

        const { match: {params}} = props;

        this.state = {
            'id': params.id,
            'products': [],
            'cart': '',
            'totalPrice': 0,
            'deliveryAddress': ''
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;

        this.getCart(params.id);

        this.getAllProducts(params.id);
    }

    getCart(id){
        CartService.getCart(id).then((resp) => {
            console.log("GET CART");
            console.log(resp.data);
            this.setState((prevState) => {
                const newValue = {
                    'cart': resp.data,
                    'deliveryAddress': resp.data.deliveryAddress === null? this.props.appUser.user.address : resp.data.deliveryAddress,
                    'totalPrice': resp.data.totalPrice
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})
        }, (err) => {console.log(err.response.status)})
    }

    getAllProducts(id ){
        CartService.getProducts(id).then((resp) => {
            console.log(resp);
            let price = 0;
            resp.data.forEach(p => {
                price += (p.productSize.productId.price * p.quantity);
            });
            this.setState((prevState) => {

                const newValue = {
                    'products': resp.data,
                    'totalPrice': price
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                console.log(this.state);

            })
        })
    }

    onChangeHandle = (e) => {
        let value = e.target.value;
        let id = e.target.id;

        if (e.target.name === "quantity") {
            const newProducts = [];
            let price = 0;
            //quantity change and sum totalPrice
            this.state.products.forEach(p => {
                if (p.id === id) {
                    p.quantity = value
                }
                price += p.quantity * p.productSize.productId.price;
                newProducts.push(p);
            });

            this.setState((prevState) => {
                const newValue = {
                    'products': newProducts,
                    'totalPrice': price
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };
                return newState;
            }, () => {
                console.log(this.state)
            });
        }
        else {
            this.setState((prevState) => {
                const newValue = {
                    'deliveryAddress': value
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };
                return newState;
            }, () => {
                console.log(this.state)
            });
        }
    };

    handleDelete = (e) => {
        console.log(e);
        console.log(this.state);
        if(window.confirm("Are you sure you want to delete this product?")) {
            let token = Cookies.get("token");
           // const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

            CartService.deleteProductFromCart(e, token).then((resp) => {
                this.getAllProducts(this.state.id);
            });
        }
    };

    onSubmitHandle = (e) => {
        e.preventDefault();


        this.props.appUserCart.userCart.deliveryAddress = this.state.deliveryAddress;
        this.props.appUserCart.userCart.totalPrice = this.state.totalPrice;
        this.props.appUserCart.userCart.products = this.state.products;

        const cartRequest = {
            'id': this.state.id,
            'deliveryAddress': this.state.deliveryAddress,
            'totalPrice': this.state.totalPrice
        };

        let products = [];

        this.state.products.forEach(p => {
            const productRequest = {
                'id': p.id,
                'productSizeId': p.productSize.id,
                'quantity': p.quantity
            };

            products.push(productRequest);
        });

        const orderRequest = {
            'cart': cartRequest,
            'cartProducts': products
        };

        let token = Cookies.get("token");
      //  const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

        CartService.createOrderRequest(orderRequest, token).then((resp) => {
            alert("Your order was successful.");
            this.props.appUserCart.setUserCart(resp.data);
            this.props.appUserCartProducts.setUserCartProducts(0);

            let date = new Date();

            Cookies.set("userCart", resp.data, {expires: date.getDate() + 7});
            Cookies.set("userCartProducts", 0, {expires: date.getDate() + 7});

            this.props.history.push("/home");
        }, (err) => {
            alert(err.response.status);
        });

        console.log(this.props.appUserCart.userCart);
    };

    render() {

        return (
            <div className="container mt-5 bg-white">
                <form onSubmit={this.onSubmitHandle}>
                    <div className="row pt-5 ml-md-4 mr-md-3 ">
                        <div className={"col-sm-3"}>
                            <h5>Image</h5>
                        </div>
                        <div className={"col-sm-3"}>
                            <h5>Product</h5>
                        </div>
                        <div className={"col-sm-2"}>
                            <h5>Quantity</h5>
                        </div>
                        <div className={"col-sm-2"}>
                            <h5>Remove</h5>
                        </div>

                    </div>
                    <div className="mt-5 border-top py-3 border-bottom">
                        {
                            this.state.products.length === 0 ?
                                <h3 className="p-5">Products not found</h3>
                                : this.state.products.map(p => <ProductCartItem appProps={this.props.appProps} appUser={this.props.appUser} appUserCart={this.props.appUserCart} userCart={this.state.id} item={p} key={p.id} id={p.id} value={p.quantity} onChangeHandle={this.onChangeHandle} handleDelete={this.handleDelete}/>)
                        }
                    </div>
                    <div className={"mt-3 row text-left p-3 ml-md-4"}>
                        <div className={"col-sm-12 p-1"}>
                            <h5>Total price: {this.state.totalPrice}</h5>
                        </div>
                        <div className={"col-sm-12 p-1"}>
                            <p>Delivery address:</p>
                            {
                                this.state.cart.id === this.props.appUserCart.userCart.id ?
                                    <input type={"text"} required={true} className={"form-control col-md-3 sm-10"} name={"deliveryAddress"} id={"deliveryAddress"} onChange={this.onChangeHandle} value={this.state.deliveryAddress} />
                                    : <p>{this.state.deliveryAddress}</p>
                            }
                        </div>
                        {
                            this.state.cart !== '' && !this.state.cart.status ?
                                <div className={"col-sm-12 p-1"}>
                                    <button type={"submit"} className={"btn btn-success"}>Order</button>
                                </div>
                                : ""
                        }
                    </div>
                </form>
            </div>
        )
    }

}

export default UserCart;
