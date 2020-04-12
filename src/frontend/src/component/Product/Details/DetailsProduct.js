import React from 'react';
import ProductService from "../../../service/ProductService";
import CartService from '../../../service/CartService';

import SizeOptionItem from "./SizeOptionItem";

import {Link} from 'react-router-dom';

import $ from 'jquery';
import ProductImage from "../ProductImage";

class DetailsProduct extends React.Component {

    constructor(props) {
        super(props);

        const {match: {params}} = props;
        let id = params.id;

        this.state = {
            'id': id,
            'name': '',
            'description': '',
            'price': 0,
            'mainImage': '',
            'images': [],
            'categoryId': '',
            'productSizes': [],
            'size': '',
            'category': '',
            'subcategory': [],
            'productQuantity': 1,
            'maxQuantity': 0
        }
    }

    componentDidMount() {

        const {match: {params}} = this.props;

        this.getDetailsProduct(params.id);
    }

    getDetailsProduct(id){
        //console.log(id);
        ProductService.getProduct(id).then((resp) => {
            if (resp.data.length !== 0) {
                console.log(resp);
                let newSizes = [];
                console.log("DETAILS PRODUCT")
                console.log(resp);

                ProductService.getSizesForProduct(id).then((respSizes) => {
                    console.log(respSizes);
                    newSizes = respSizes.data;
                });

                this.setState((prevState) => {
                    const newValue = {
                        'id': resp.data.id,
                        'name': resp.data.name,
                        'description': resp.data.description,
                        'price': resp.data.price,
                        'mainImage': resp.data.mainImage,
                        'images': resp.data.images,
                        'categoryId': resp.data.category.id,
                        'sizes': newSizes,
                        'category': resp.data.category.subcategory.name,
                        'subcategory': resp.data.category.name,
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState;
                }, () => {
                    this.getProductSizes(id);
                    ProductService.increaseViews(id).then((resp) => {
                    }, (err) => {
                        console.log(err.response.statusText)
                    });
                });
            }else{
                alert("Obidete se povtorno");
                this.props.history.push("/products");
            }
        }, (err) => {
            alert("Obidete se povtorno");
            this.props.history.push("/products");
        });
    }

    getProductSizes(id){
        ProductService.getSizesForProduct(id).then((resp) => {
            this.setState((prevState) => {
                // console.log("GET PRODUCT SIZES");
                // console.log(resp.data);
                const newValue = {
                    'productSizes': resp.data
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            },() => {
                console.log("CALLBACK FUNCTION");
                let selected = $('#size :selected').val();
                if(selected !== undefined) {
                    let product = this.state.productSizes.find(p => p.id === selected);

                    this.setState((prevState) => {
                        const newValue = {
                            'size': selected,
                            'maxQuantity': product.quantity
                        };
                        const newState = {
                            ...prevState,
                            ...newValue
                        };

                        return newState;
                    }, () => {
                        console.log(this.state)
                    })
                }
            })
        }, (err) => {
            console.log(err.response.statusText);
        });

    }

    onClickHandle = (e) => {
        this.setState((prevState) => {
            const newValue = {
                'mainImage': e
            };
            const newState = {
                ...prevState,
                ...newValue
            };
            return newState;
        })
    };

    onChangeHandle = (e) => {
        console.log(e.target.name);
        if (e.target.name === "maxQuantity"){
            let value = e.target.value;
            this.setState((prevState) => {
                const newValue = {
                    'productQuantity': value
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})
        } else {
            let selected = e.target.value;
            let product = this.state.productSizes.find(p => p.id === selected);

            this.setState((prevState) => {

                const newValue = {
                    'size': selected,
                    'maxQuantity': product.quantity,
                    'productQuantity': 1
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };
                return newState;
            }, () => {
                console.log(this.state)
            })
        }
    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        if (this.props.appUserCart.userCart !== null) {
            const cartProductRequest = {
                'cartId': this.props.appUserCart.userCart.id,
                'productSizeId': this.state.size,
                'quantity': this.state.productQuantity
            };

            CartService.addProductToCart(cartProductRequest).then((resp) => {
                console.log(resp);

                let value = this.props.appUserCartProducts.userCartProducts + 1;

                this.props.appUserCartProducts.setUserCartProducts(value);

                this.props.history.push("/products");
            }, (err) => {
                console.log(err.response.statusText);
            })
        }
        else{
            this.props.history.push("/login");
        }
    };

    render() {
        return (
            <div className=" bg-white p-3 w-md-50 container text-left">
                <Link to={{pathname: `/products`}}><h4>Back to products</h4></Link>
                <form onSubmit={this.onSubmitHandle} className="p-3">
                    <div className="row col-sm-12 col-md-6 ">
                        <img alt={"product"} src={this.state.mainImage} width={100 +"%"} height={300+"px"} style={{maxHeight:350+"px"}} className="center img-fluid "/>
                    </div>
                    <div className="row">
                        {
                            this.state.images.length > 0 ?
                                this.state.images.map(i => <ProductImage key={i.id} id={i.id} item={i} image={i.image} showButtons={false} onClick={this.onClickHandle} onRemove={this.onRemoveHandle} />) :""
                        }
                    </div>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-sm-12 col-md-2 p-1">Name : </label>
                        <div className="col-sm-12 col-md-8">
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-form-label col-sm-12 col-md-2 p-1">Description : </label>
                        <div className="col-sm-12 col-md-8">
                            <p>{this.state.description}</p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="mainCategories" className="col-form-label col-sm-12 col-md-2 p-1">Main Category  : </label>
                        <div className="col-sm-12 col-md-8">
                            <p>{this.state.category}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="subCategories" className="col-form-label col-sm-12 col-md-2 p-1">Subcategory  : </label>
                        <div className="col-sm-12 col-md-8">
                            <p>{this.state.subcategory}</p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-">
                            <select id="size" name="size" className="form-control" onChange={this.onChangeHandle}>
                                {
                                    this.state.productSizes.map(s => <SizeOptionItem item={s} key={s.id} id={s.id} quantity={s.quantity} value={s.quantity} disabled={s.quantity===0} onChange={this.onChangeHandle}/>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="price" className="col-form-label col-sm-12 col-md-2 p-1">Price  : </label>
                        <div className="col-sm-8">
                            <h4>{this.state.price}</h4>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="price" className="col-form-label col-sm-12 col-md-2 p-1">Quantity  : </label>
                        <div className="col-sm-3">
                            <input type="number" id="productQuantity" name="maxQuantity" className="form-control" onChange={this.onChangeHandle} value={this.state.productQuantity} min={1} max={this.state.maxQuantity} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type='submit' name="submit" className="btn btn-success m-0">Add to cart</button>
                    </div>
                </form>
            </div>

        );
    }

}

export default DetailsProduct;
