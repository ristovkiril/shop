import React from 'react';
import ReactPaginate from "react-paginate";

import CategoryService from '../../service/CategoryService'

import CategoryItem from "./CategoryItem";

import {Link} from "react-router-dom";

class CategoryIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'categories': [],
            'page': 0,
            'size': 10,
            'totalPages': 0
        }
    }

    componentDidMount() {
        this.getAllCategories();
    }

    getAllCategories(page = this.state.page, size = this.state.size){
        CategoryService.getAllCategoriesPaged(page, size).then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'categories': resp.data.content,
                    'page': resp.data.pageable.pageNumber,
                    'size': resp.data.size,
                    'totalPages': resp.data.totalPages
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            },() => {
                console.log("GET ALL CATEGORIES");
                console.log(this.state.categories)
            })
        })
    }

    removeHandle = (e) => {
        console.log(e);
        if(window.confirm("Are you sure you want to delete this category?")) {
            CategoryService.deleteCategory(e).then((resp) => {
                console.log(resp);
                this.getAllCategories();
            });
        }
    };

    handlePageClick = (pageChangedEvent) => {
        this.getAllCategories(pageChangedEvent.selected)
    };


    paginationList = () =>
        <ReactPaginate previousLabel={'← Previous'}
                       nextLabel={'Next →'}
                       breakLabel={<span className="gap">...</span>}
                       breakClassName={'break-me'}
                       pageCount={this.state.totalPages}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       pageClassName={'page-item'}
                       pageLinkClassName={'page-link'}
                       previousClassName={'page-item'}
                       nextClassName={'page-item'}
                       previousLinkClassName={'page-link'}
                       nextLinkClassName={'page-link'}
                       forcePage={this.state.page}
                       onPageChange={this.handlePageClick}
                       containerClassName={'pagination justify-content-center'}
                       activeClassName={'active'}
                       disabledClassName={"disabled"}
        />;

    render() {

        return (

            <div className="container mt-5 pb-3 bg-white">
                <div className="mt-5 row">
                    {
                        this.props.appUser.user !== null && (this.props.appUser.user.role !== "CUSTOMER")?
                            <div className="text-left mt-5 p-4 col-6">
                                <h4>
                                    <Link to={{pathname:`/category/create`}}>Create new</Link>
                                </h4>
                            </div>: ""
                    }

                </div>
                <div className="row">
                    {
                        this.state.categories.length === 0 ?
                            <h3 className="p-5">Categories not found</h3>
                            : this.state.categories.map(p => <CategoryItem appProps={this.props.appProps} appUser={this.props.appUser} item={p} key={p.id} id={p.id} handleDelete={this.removeHandle}/>)
                    }
                </div>

                <div className="m-0 p-3">
                    {this.paginationList()}
                </div>
            </div>

        );
    }


}

export default CategoryIndex;
