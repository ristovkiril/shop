import React from 'react'

import SizeItem from "../Create/SizeItem";
import ProductService from "../../../service/ProductService";

import $ from 'jquery';
import {Link} from "react-router-dom";
import ProductImage from "../ProductImage";
import Cookies from "js-cookie";

class  CreateProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'id': '',
            'name': '',
            'description': '',
            'price': 0,
            'mainImage': '',
            'images': [],
            'newImages': [],
            'categoryId': '',
            'sizes': [],
            'category': '',
            'subcategory': [],
            'product': {}
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;
        this.getProduct(params.id);
    }

    getProduct(id){
        ProductService.getProduct(id).then((resp) => {

            this.setState((prevState) => {

                const newValue = {
                    'id': resp.data.id,
                    'name': resp.data.name,
                    'description': resp.data.description,
                    'mainImage': resp.data.mainImage,
                    'images': resp.data.images,
                    'newImages': [],
                    'price': resp.data.price,
                    'categoryId': resp.data.category.id,
                    'sizes': resp.data.sizes,
                    'category': resp.data.category.subcategory.name,
                    'subcategory': resp.data.category.name,
                    'product': resp.data
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            },() => {
                this.getAllSizes(this.state.id);
            });
        }, (err) => {
            console.log(err.response.statusText);
        });
    }

    getAllSizes(product){
        ProductService.getSizesForProduct(product).then((resp)=>{
            const newSizes = [];

            console.log(resp.data);
            resp.data.forEach(s => {
                const sizeRequest = {
                    'id': s.id,
                    'size': s.sizeId.id,
                    'name': s.sizeId.size,
                    'quantity': s.quantity
                };
                newSizes.push(sizeRequest);
            });

            this.setState((prevState) => {
                const newValue = {
                    'sizes': newSizes
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                console.log(this.state)
            });
        },(err) => {
            alert(err.response.statusText)
        });
    }

    changeQuantity(id, value){
        const newSize = [];
        this.setState((prevState) => {
            prevState.sizes.forEach((s) => {
                console.log(s);

                if(s.size === id){
                    const sizeRequest = {
                        'id': s.id,
                        'size': s.size,
                        'name': s.name,
                        'quantity': value
                    };
                    newSize.push(sizeRequest);
                }
                else{
                    const sizeRequest = {
                        'id': s.id,
                        'size': s.size,
                        'name': s.name,
                        'quantity': s.quantity
                    };
                    newSize.push(sizeRequest);
                }
            });
            console.log(newSize);
            const newValue = {
                'sizes': newSize
            };
            const newState = {
                ...prevState,
                ...newValue
            };

            return newState
        }, () => {
            console.log(this.state)
        });
    }

    onChangeHandle = (e) => {
        console.log(e.target.name);

        if (e.target.name === "quantity"){
            console.log(e.target);
            const id = e.target.id;
            if(!isNaN(e.target.value)) {
                const value = parseInt(e.target.value);
                this.changeQuantity(id, value);
            }
        }
        if (e.target.name === "newImages"){
            let fileObj = e.target.files;

            const lista = [];
            for (let i = 0; i < fileObj.length; i++) {
                if(fileObj[i] !== undefined) {
                    lista.push(e.target.files[i]);
                }
            }

            this.setState({
                [e.target.name]: lista
            }, () => {console.log(this.state)})
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    onClickHandle = (e) => {
        let images = [];
        console.log(e);
        let url = this.state.mainImage;
        this.state.images.forEach(i => {
            if (i.id === e){
                i.mainImage = true;
                url = i.image
            }
            else{
                i.main = false;
            }
            images.push(i);
        });

        this.setState((prevState) => {
            const newValue = {
                'mainImage': url,
                'images': images
            };

            const newState = {
                ...prevState,
                ...newValue
            };

            return newState;
        }, () => {
            let token = Cookies.get("token");

            ProductService.setMainImage(this.state.id, e, token).then((resp) => {
                // this.setState((prevState) => {
                //     const newValue = {
                //         'images': resp.data
                //     };
                //     const newState = {
                //         ...prevState,
                //         ...newValue
                //     };
                //     return newState;
                // })
            }, (err) => {
                console.log(err);
            });

        }
        )
    };

    onRemoveHandle = (e) => {
        if(window.confirm("Are you sure you want to delete this image?")) {
            let token = Cookies.get("token");
            //const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

            ProductService.deleteImage(e, token).then((resp) => {
                console.log(e);
                let images = [];

                this.state.images.forEach(i => {
                    if (i.id !== e) {
                        images.push(i)
                    }

                });

                this.setState((prevState) => {
                    let main = prevState.mainImage === e ? images[0].image : prevState.mainImage;
                    const newValue = {
                        'images': images,
                        'mainImage': main
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };
                    return newState;
                }, () => {

                })

            }, (err) => {
                console.log(err);
            })
        }
    };

    onSubmitHandle = (e) => {
        e.preventDefault();
        //Treba da se naprave check dali gi ima site raboti

        if(this.checkValidation()){
            return;
        }
        //Posle toa objekt da se naprave

        const newSizes = [];
        this.state.sizes.forEach(s => {
            console.log("size request");
            console.log(s);
            const sizeRequest = {
                'size': s.id,
                'quantity': s.quantity
            };
            console.log(sizeRequest);
            newSizes.push(sizeRequest);
        });
        const productRequest = {
            'name': this.state.name,
            'description': this.state.description,
            'price': this.state.price,
            'categoryId': this.state.categoryId,
            'images': this.state.images,
            'sizes': newSizes
        };
        console.log(productRequest);

        let token = Cookies.get("token");
        //const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

        ProductService.updateProduct(this.state.id, productRequest, token).then((resp) =>{
            if (this.state.newImages.length > 0) {
                let product = resp.data;
                const files = new FormData();

                this.state.newImages.forEach((item, i) => {
                    if(item !== undefined) {
                        files.append("images", item);
                    }
                });

                ProductService.createProductImages(product.id, files, token).then((resp) => {
                    this.props.history.push("/products")
                }, (err) => {
                    alert("Error");
                })
            }
            else {
                this.props.history.push("/products")
            }
        }, (err) => {
            alert(err.response);
        })
    };

    checkValidation(){
        let error = false;
        if(isNaN($('#name input[type="text"]').val())){
            let check = $('#name');
            if(!$(check).val()){
                $(check).addClass("border-danger");
                error = true;
            }else{
                check.removeClass("border-danger");
            }
        }
        if(isNaN($('#description input[type="text"]').val())){
            let check = $('#description');
            if(!$(check).val()){
                $(check).addClass("border-danger");
                error = true;
            }else{
                check.removeClass("border-danger");
            }
        }
        if(parseInt($("#price").val()) === 0 || isNaN($("#price").val())){
            $("#price").addClass("border-danger");
            error = true;
        }else{
            $("#price").removeClass("border-danger");
        }
        return error;
    }

    render() {

        return (
            <div className="text-left container bg-white p-2 ">
                <Link to={{pathname: `/products`}}><h4>Back to products</h4></Link>
                <form id="product-form" onSubmit={this.onSubmitHandle} className="p-5">
                    <div className="row my-1" style={{maxHeight: 450 + "px"}}>
                        <div className="col-md-6 col-sm-12">
                            <img alt={"product"} src={this.state.mainImage} width={100 +"%"} style={{maxHeight: 450+"px"}}   className="center img-fluid p-0"/>
                        </div>

                    </div>
                    <div className="row ">
                        {
                            this.state.images.length > 0 ?
                                this.state.images.map(i => <ProductImage key={i.id} id={i.id} item={i} image={i.image} showButtons={true} onClick={this.onClickHandle} onRemove={this.onRemoveHandle} />) :""
                        }
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-md-3 col-sm-12 p-1">Name : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="name" name="name" type="text" className="form-control"
                                   value={this.state.name} onChange={this.onChangeHandle} required={true} minLength={3}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-form-label col-md-3 col-sm-12 p-1">Description : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="description" name="description" type="text" className="form-control"
                                   value={this.state.description} onChange={this.onChangeHandle} required={true} minLength={5}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="files" className="col-form-label col-md-3 col-sm-12 p-1">Images : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="files" name="newImages" type="file" className="form-control-file"
                                   onChange={this.onChangeHandle} multiple/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="price" className="col-form-label col-md-3 col-sm-12 p-1">Price  : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="price" name="price" type="number" min={0} className="form-control"
                                   value={this.state.price} onChange={this.onChangeHandle} required={true} minLength={5}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="mainCategories" className="col-form-label col-md-3 col-sm-12 p-1">Main Category  : </label>
                        <div className="col-sm-10 col-md-6">
                            <input type="text" id="category" name="category"
                                   value={this.state.category} className="form-control" disabled required={true} minLength={5}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="subCategories" className="col-form-label col-md-3 col-sm-12 p-1">Subcategory  : </label>
                        <div className="col-sm-10 col-md-6">
                            <input type="text" id="categoryId" name="categoryId"
                                   value={this.state.subcategory} className="form-control" required={true} minLength={5} disabled/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-9 col-md-5">
                            {
                                this.state.sizes.map(s => <SizeItem item={s} key={s.size} id={s.size} value={s.quantity} onChange={this.onChangeHandle}/>)
                            }
                        </div>
                    </div>

                    <button type='submit' className="btn btn-primary" name="submit">Save</button>
                </form>
            </div>

        )

    }

}

export default CreateProduct;
