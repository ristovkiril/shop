import React from 'react';

import CategorySize from '../Create/CategorySize';

import CategoryService from '../../../service/CategoryService';
import SizeService from '../../../service/SizeService';
import CategorySelectOption from "../../Product/Create/CategorySelectOption";
import $ from "jquery";
import {Link} from "react-router-dom";


class EditCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'id': '',
            'name': '',
            'mainCategory': 'default',
            'sizes': [],
            'categories': []
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;

        this.getCategory(params.id);
        this.getMainCategories();
        this.getSizes(params.id);

    }

    getCategory(id){
        CategoryService.getCategory(id).then((resp) => {
            console.log(resp);
            this.setState((prevState) => {
                if(resp.data.subcategory === null) {
                    $('#addSize').prop('disabled', true);
                }

                const newValue = {
                    'id': resp.data.id,
                    'name': resp.data.name,
                    'mainCategory': resp.data.subcategory === null ? "default" : resp.data.subcategory.id
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})
        },(err) => {
            const {data} = err.response;
            alert(data.error);
        })
    }

    getSizes(id){
        SizeService.getAllSizesFromCategory(id).then((resp) => {
            console.log(resp);
            this.setState((prevState) => {
                let newSizes =[];
                resp.data.forEach((s) => {
                   const sizeReq = {
                       'id': s.id,
                       'sizeName': s.size
                   };
                   newSizes.push(sizeReq);
                });

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
            const {data} = err.response;
            alert(data.error);
        });
    }

    getMainCategories () {
        CategoryService.getMainCategories().then((resp) => {
            this.setState((prevState) => {
                console.log("Get Main Categories");
                console.log(resp.data);

                const newValue = {
                    'categories': resp.data
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                console.log("Callback from getMainCategories");
                console.log(this.state)
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
        const id = this.state.id;
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
            'id': id,
            'name': name,
            'mainCategory': mainCategory,
            'sizes': sizeRequest
        };

        CategoryService.updateCategory(id,categorySizeRequest).then((resp) => {
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
        return <div className="container bg-white p-2 w-md-50  text-left">

            <Link to={{pathname: `/category`}}><h4>Back to category</h4></Link>

            <form id="category-form" onSubmit={this.onSubmitHandle} className="p-5">
                <div className="form-group row">
                    <label htmlFor="name" className="col-form-label col-md-3 col-sm-12 p-1">Name : </label>
                    <div className="col-sm-12 col-md-6">
                        <input id="name" name="name" type="text" className="form-control" value={this.state.name}
                               onChange={this.onChangeHandle} required={true} minLength={5}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="categories" className="col-form-label col-md-3 col-sm-12 p-1">Main Category : </label>
                    <div className="col-sm-12 col-md-6">
                        <small><b>остави го празно ако сакаш да биде главна категорија</b></small>
                        <select id="categories" name="mainCategory" className="form-control"
                                onChange={this.onChangeHandle}>
                            <option value="default">Одбери над категорија</option>
                            {
                                this.state.categories.map(c => <CategorySelectOption item={c} key={c.id} id={c.id}
                                                                                     select={c.id === this.state.mainCategory} />)
                            }
                        </select>
                    </div>
                </div>

                <div className="form-group row" id="sizes-row">
                    <label htmlFor={this.state.sizes} className="col-form-label col-md-3 col-sm-12 p-1">Sizes: </label>
                    <div className="col-sm-12 col-md-6">
                        {/*<input type="text" name="sizes" id="sizes" className="form-control" value={this.state.sizes} onChange={this.onChangeHandle}/>*/}
                        {
                            this.state.sizes.map(s => <CategorySize item={s} key={s.id} id={s.id} value={s.sizeName}
                                                                    onChange={this.onChangeHandle}
                                                                    onClick={this.onSizeRemove}/>)
                        }
                    </div>

                </div>
                <div className="row">
                    <button type="button" id={"addSize"} name="addSize" className="btn btn-success m-2 mr-auto"
                        onClick={this.onClickHandle}>Add new size</button>
                </div>
                <div className="row">
                    <button className="btn btn-info m-2 mr-auto" type='submit' name="submit">Save</button>
                </div>
            </form>
        </div>
    }

}

export default EditCategory;
