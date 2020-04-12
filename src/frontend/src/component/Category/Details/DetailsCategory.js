import React from 'react';

import CategoryService from '../../../service/CategoryService';
import SizeService from '../../../service/SizeService'
import $ from "jquery";
import {Link} from "react-router-dom";

class DetailsCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'id': '',
            'mainCategory': '',
            'sizes' : '',
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;

        this.getCategory(params.id);
        this.getSizes(params.id);
    }

    getCategory(id){
        CategoryService.getCategory(id).then((resp) => {
            console.log(resp);
            this.setState((prevState) => {

                if(resp.data.subcategory === null){
                    $("#sizes").hide();
                }

                const newValue = {
                    'id': resp.data.id,
                    'name': resp.data.name,
                    'mainCategory': resp.data.subcategory === null ? "-" : resp.data.subcategory
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
                let string = '';
                resp.data.forEach((s) => {
                    string += s.size + ' ,'
                });

                string.substr(0, string.length-1);
                const newValue = {
                    'sizes': string
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

    render() {
        return (
            <div className="container bg-white p-5 w-md-50  text-left">
                <Link to={{pathname: `/category`}}><h4>Back to category</h4></Link>

                <div className="form-group row">
                        <label htmlFor="name" className="col-form-label col-sm-12 col-md-3 p-1">Name : </label>
                        <div className="col-sm-12 col-md-9">
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-form-label col-sm-12 col-md-3 p-1">Subcategory : </label>
                        <div className="col-sm-12 col-md-9">
                            <p>{this.state.mainCategory.name}</p>
                        </div>
                    </div>

                    <div className="form-group row sizes">
                        <label htmlFor="sizes" className="col-form-label col-sm-12 col-md-3 p-1">Main Category  : </label>
                        <div className="col-sm-12 col-md-9">
                            <p>{this.state.sizes}</p>
                        </div>
                    </div>

            </div>

        );
    }

}

export default DetailsCategory;
