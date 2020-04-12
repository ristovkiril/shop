import React from 'react'
import CategoryService from '../../../service/CategoryService'
import SizeService from '../../../service/SizeService'

import CategorySelectOption from "./CategorySelectOption";
import SizeItem from "./SizeItem";
import ProductService from "../../../service/ProductService";

import $ from 'jquery';
import {Link} from "react-router-dom";

class  CreateProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'description': '',
            'price': 0,
            'categoryId': '',
            'sizes': [],
            'mainCategories': [],
            'subCategories': [],
            'files': []
        }
    }

    componentDidMount() {
        this.getMainCategories();
    }

    getMainCategories(){
        CategoryService.getMainCategories().then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'mainCategories': resp.data
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState
            }, () => {console.log(this.state)});
        });
        console.log(this.state)
    }

    getSubcategories(category){
        CategoryService.getSubcategoriesFromCategory(category).then((resp) => {
            this.setState((prevState) => {
                    const newValue = {
                        'subCategories': resp.data
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState
            }, () => {console.log(this.state)});
        });
    }

    getAllSizes(category){
        SizeService.getAllSizesFromCategory(category).then((resp) => {
            const newSize = [];
            this.setState((prevState) => {
                resp.data.forEach((s) => {
                    console.log(s);
                    const sizeRequest = {
                        'size': s.id,
                        'name': s.size,
                        'quantity': 0
                    };

                    newSize.push(sizeRequest);
                });
                console.log(newSize);
                const newValue = {
                    'categoryId': category,
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
        });

    }

    incrementQuantity(id, value){
        const newSize = [];
        this.setState((prevState) => {
            prevState.sizes.forEach((s) => {
                console.log(s);

                if(s.size === id){
                    const sizeRequest = {
                        'size': s.size,
                        'name': s.name,
                        'quantity': value
                    };
                    newSize.push(sizeRequest);
                }
                else{
                    const sizeRequest = {
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
        // debugger;
        if(e.target.name === "mainCategories"){
            let id = e.target.value;
            if(id !== "default") {
                this.getSubcategories(id);
            }
        }
        else if (e.target.name === "subCategories" ){
            let id = e.target.value;
            console.log(id);
            //debugger;
            if(id !== "default") {
                this.getAllSizes(id);
            }
        }
        else if (e.target.name === "quantity"){
            console.log(e.target);
            const id = e.target.id;
            if(!isNaN(e.target.value)) {
                const value = parseInt(e.target.value);
                this.incrementQuantity(id, value);
            }
        }
        else if (e.target.name === "files") {
            let fileObj = e.target.files;

            const lista = [];
            for (let i = 0; i < fileObj.length; i++) {
                lista.push(e.target.files[i]);
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

    onSubmitHandle = (e) => {
        e.preventDefault();

        //Treba da se naprave check dali gi ima site raboti
        if(this.checkValidation()){
            return;
        }
        //Posle toa objekt da se naprave

        const newSizes = [];
        this.state.sizes.forEach(s => {
           const sizeRequest = {
               'size': s.size,
               'quantity': s.quantity
           };
           newSizes.push(sizeRequest);
        });
        const productRequest = {
            'name': this.state.name,
            'description': this.state.description,
            'price': this.state.price,
            'categoryId': this.state.categoryId,
            'sizes': newSizes
        };

        ProductService.addProducts(productRequest).then((resp) =>{
            if (this.state.files.length > 0) {
                let product = resp.data;
                const files = new FormData();

                this.state.files.forEach((item, i) => {
                    files.append("images", item);
                });

                ProductService.createProductImages(product.id, files).then((resp) => {
                    this.props.history.push("/products");
                }, (err) => {
                    alert("Image size is very big try with few photos.");
                    this.props.history.push(`/products/${product.id}/edit`);
                })
            }
            else{
                alert("add image");
                this.props.history.push("/products");
            }
        }, (err) => {
            alert("Try again something went wrong");
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
            let  check = $('#description');
            if(!$(check).val()){
                $(check).addClass("border-danger");
                error = true;
            }else{
                check.removeClass("border-danger");
            }
        }
        if(isNaN($('#mainCategories select selected').val())){
            let check = $('#mainCategories');
            if($(check).val() === "default"){
                $(check).addClass("border-danger");
                error = true;
            }else{
                $(check).removeClass("border-danger");
            }
        }
        if(isNaN($('#subCategories select selected').val())){
            let check = $('#subCategories');
            if($(check).val() === "default"){
                $(check).addClass("border-danger");
                error = true;
            }else{
                $(check).removeClass("border-danger");
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
            <div className="bg-white p-2 w-md-50 container text-left">

                <Link to={{pathname: `/products`}}><h4>Back to products</h4></Link>

                <form id="product-form" onSubmit={this.onSubmitHandle} className="p-5">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-md-3 col-sm-12 p-1">Name : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="name" name="name" type="text" className="form-control"
                                   value={this.state.name} onChange={this.onChangeHandle} required={true} minLength={5} />
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
                        <label htmlFor="files"  className="col-form-label col-md-3 col-sm-12 p-1">Images : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="files" name="files" type="file" className="form-control-file"
                                   onChange={this.onChangeHandle} required={true} multiple/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="price"  className="col-form-label col-md-3 col-sm-12 p-1">Price : </label>
                        <div className="col-sm-10 col-md-6">
                            <input id="price" name="price" type="number" min={0} className="form-control"
                                   value={this.state.price} onChange={this.onChangeHandle} required={true} minLength={5}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="mainCategories"  className="col-form-label col-md-3 col-sm-12 p-1">Main Category  : </label>
                        <div className="col-sm-10 col-md-6">
                            <select id="mainCategories" name="mainCategories" className="form-control" onChange={this.onChangeHandle}>
                                <option value="default">Одбери Категорија</option>
                                {
                                    this.state.mainCategories.map(c => <CategorySelectOption item={c} key={c.id} id={c.id} select={false} />)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="subCategories" className="col-form-label col-md-3 col-sm-12 p-1">Subcategory  : </label>
                        <div className="col-sm-10 col-md-6">
                            <select id="subCategories" name="subCategories" className="form-control" onChange={this.onChangeHandle}>
                                <option value="default" >Одбери Категорија</option>
                                {
                                    this.state.subCategories.map(c => <CategorySelectOption item={c} key={c.id} id={c.id} />)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="p-3 col-sm-12 col-md-9">
                            {
                                this.state.sizes.map(s => <SizeItem item={s} key={s.size} id={s.size} value={s.quantity} onChange={this.onChangeHandle}/>)
                            }
                        </div>
                    </div>
                    <button className="btn btn-info" type='submit' name="submit">Save</button>
                </form>
            </div>

        )
    }

}

export default CreateProduct;
