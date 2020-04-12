import React from 'react';

import CategoryService from '../../../service/CategoryService';
import SizeService from '../../../service/SizeService';

import $ from 'jquery';
import CategorySelectOption from "../../Product/Create/CategorySelectOption";
import CategorySize from "./CategorySize";
import {Link} from "react-router-dom";

class CreateCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'mainCategory': 'default',
            'sizes': [],
            'categories': []
        }
    }

    componentDidMount() {
        this.getMainCategories();
        $('#addSize').prop('disabled', true);
    }

    getMainCategories () {
        CategoryService.getMainCategories().then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'categories': resp.data
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            })
        })
    }

    onChangeHandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let id = e.target.id;
        if(name === "mainCategory"){
            if (e.target.value !== "default"){
                $('#addSize').prop('disabled', false);
               // $('#addSize input[type="text"]').prop('disabled', false);
            }else{
                $('#addSize').prop('disabled', true);
                this.checkSizes();
                //$('#addSize input[type="text"]').prop('disabled', true);
            }
        }
        //TUKA TREBA DA PROVERAM DALI E SIZE-NAME I POSLE GO NAJDAM I MU SMENAM VREDNOST
        if(name === "sizeName"){
            this.setState((prevState) => {

                var lista = [];
                prevState.sizes.forEach(s => {
                    if (s.id === id){
                        s = {
                            'id': id,
                            'sizeName': value
                        };
                    }
                    lista.push(s);
                });
                const newValue = {
                    'sizes': lista
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            }, () => {
                console.log(this.state);
            });

        }
    };

    onClickHandle = (e) => {
        SizeService.getEmptySize().then((resp) => {
            this.setState((prevState) => {
                let newSize = [];
                let value = resp.data.size === null ? '' : resp.data.size;
                prevState.sizes.forEach(s => {
                    newSize.push(s);
                });
                newSize.push({
                    'id': resp.data.id,
                    'sizeName': value
                });
                const newValue = {
                    'sizes': newSize
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})


        });

    };

    onSizeRemove = (e) => {

        if(window.confirm("Are you sure you want to delete this size?")) {
            SizeService.deleteSize(e).then((succ) => {
                let newSizes = [];
                this.state.sizes.forEach(s => {
                    if (s.id !== e) {
                        newSizes.push(s);
                    }
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
                })

            }, (err) => {
                alert(err.toString());
            })
        }
    };

    onSubmitHandle = (e) =>{
        e.preventDefault();
        //Validation
        if(this.checkValidation()){
            return;
        }
        //Create new Category with sizes
        const name = this.state.name;
        const mainCategory = this.state.mainCategory === "default" ? null : this.state.mainCategory;
        let sizeRequest = [];
        if (mainCategory !== null) {
            this.state.sizes.forEach(s => {
                const newSize = {
                    'id': s.id,
                    'size': s.sizeName
                };
                sizeRequest.push(newSize);
            })
        }
        const categorySizeRequest = {
            'name': name,
            'mainCategory': mainCategory,
            'sizes': mainCategory === null ? null: sizeRequest
        };

        CategoryService.addCategory(categorySizeRequest).then((resp) => {
            CategoryService.getMainCategories().then((respCategories) => {

                console.log(this.props);

                this.props.setMainCategories(respCategories.data);
            });
            this.props.history.push("/category");
        }, (err) => {
            const {data} = err.response;
            alert(data.error);
        });

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

       let sizesError = this.checkSizes();
       if (error === false){
           error = sizesError;
       }
       return error;
    }

    checkSizes () {
        let error = false;
        let deleteSizes = false;

        if(this.state.mainCategory === "default"){
            deleteSizes = true;
        }
        this.state.sizes.forEach(s => {
            if(isNaN($(`#${s.id} input[type="text"]`))){
                let check = $(`#${s.id}`);

                if(!$(check).val() || deleteSizes) {
                    $(check).addClass("border-danger");
                    error = true;
                }else{
                    check.removeClass("border-danger");
                }
            }
        });
        return error;
    }

    render() {
        return (
            <div className="container bg-white p-2 w-md-50  text-left">
                <Link to={{pathname: `/category`}}><h4>Back to category</h4></Link>
                <form id="category-form" onSubmit={this.onSubmitHandle} className="p-5">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-md-3 col-sm-12 p-1">Name : </label>
                        <div className="col-sm-12 col-md-6">
                            <input id="name" name="name" type="text" className="form-control"
                                   value={this.state.name} onChange={this.onChangeHandle} required={true} minLength={5} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="categories" className="col-form-label col-md-3 col-sm-12 p-1">Main Category  : </label>
                        <div className="col-sm-12 col-md-6">
                            <small><b>остави го празно ако сакаш да биде главна категорија</b></small>
                            <select id="categories" name="mainCategory" className="form-control" onChange={this.onChangeHandle}>
                                <option value="default">Одбери над категорија</option>
                                {
                                    this.state.categories.map(c => <CategorySelectOption item={c} key={c.id} id={c.id} />)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-group row" id="sizes-row">
                        <label htmlFor={this.state.sizes} className="col-form-label col-md-3 col-sm-12 p-1">Sizes: </label>
                        <div className="col-sm-12 col-md-6">
                            {
                                this.state.sizes.map(s => <CategorySize item={s} key={s.id} id={s.id} value={s.sizeName} onChange={this.onChangeHandle} onClick={this.onSizeRemove} />)
                            }
                        </div>
                    </div>

                    <div className="row">
                        <button type="button" id={"addSize"} name="addSize" className="btn btn-success m-2 mr-auto" onClick={this.onClickHandle}>Add new size</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-info m-2 mr-auto" type='submit' name="submit">Save</button>
                    </div>
                </form>
            </div>

        )
    }

}

export default CreateCategory;
