import React from 'react';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {Doughnut} from "react-chartjs-2";

import ProductService from '../../service/ProductService';

import ProductItem from './ProductItem';
import ProductBarChart from "./Charts/ProductBarChart";

class ProductIndex extends React.Component {

    constructor(props){
        super(props);
        // console.log("PRODUCT INDEX")
        console.log(props);

        const {match: {params}} = this.props;
        let categoryId = params.id;

        this.state = {
            'products': [],
            'page': 0,
            'size': 9,
            'totalPages': 0,
            'categoryId': categoryId,
            'term': ''
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        let categoryId = params.id;

        console.log(categoryId);
        this.getProducts(this.state.page,this.state.size, categoryId);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {match: {params}} = nextProps;
        let categoryId = params.id;
        if(categoryId !== null && categoryId !== undefined && categoryId !== "") {
            //alert("HELLP");
            this.setState((prevState) => {
                const newValue = {
                    'page': 0,
                    'size': 9
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };
                return newState;
            });

            this.getProducts(0, 9, categoryId);
        }
    }

    getProducts(page = this.state.page, size = this.state.size, categoryId = null){
        if(categoryId !== null && categoryId !== undefined && categoryId !== ""){
            ProductService.getProductsByCategoryPaged(categoryId, page, size).then((resp) => {
                console.log(resp.data);

                this.setState((prevState) => {
                    const newValue = {
                        'products': resp.data.content,
                        'page': resp.data.pageable.pageNumber,
                        'size': resp.data.size,
                        'totalPages': resp.data.totalPages,
                        'categoryId': categoryId
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState;
                });
            });
        }
        else{
            ProductService.getAllProductsPaged(page, size).then((resp) => {
                console.log(resp.data);

                this.setState((prevState) => {
                    const newValue = {
                        'products': resp.data.content,
                        'page': resp.data.pageable.pageNumber,
                        'size': resp.data.size,
                        'totalPages': resp.data.totalPages,
                        'categoryId': categoryId
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState;
                });
            });
        }
    }

    getProductsWithTerm(){

            ProductService.getAllProductsSearchEnginePaged(this.state.term ,this.state.page, this.state.size).then((resp) => {
                console.log(resp.data);

                this.setState((prevState) => {
                    const newValue = {
                        'products': resp.data.content,
                        'page': resp.data.pageable.pageNumber,
                        'size': resp.data.size,
                        'totalPages': resp.data.totalPages
                    };
                    const newState = {
                        ...prevState,
                        ...newValue
                    };

                    return newState;
                });
            }, (err) => {
                console.log("error in search engine");
            });

    }

    removeHandle = (e) => {
        console.log(e);
        if(window.confirm("Are you sure you want to delete this product?")) {
            ProductService.deleteProduct(e).then((resp) => {
                this.getProducts(this.state.page, this.state.size, this.state.categoryId);
            });
        }
    };

    handlePageClick = (pageChangedEvent) => {
        this.getProducts(pageChangedEvent.selected)
    };

    onChangeHandle = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };

    onSubmitHandle = (e) => {
        e.preventDefault();

        if(this.state.term === "" || this.state.term === null){
            this.setState((prevState) => {
                const newValue = {
                    'page': 0,
                    'size': 10
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                this.getProducts(this.state.page, this.state.size, this.state.categoryId);
            })
        }
        else{
            this.setState((prevState) => {
                const newValue = {
                    'page': 0,
                    'size': 10
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {
                this.getProductsWithTerm();
            });
        }

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
            <div className="container pb-5 my-3 py-3 bg-white">
                {
                    this.props.appUser.user !== null && (this.props.appUser.user.role !== "CUSTOMER") && this.state.products.length !== 0?
                        <ProductBarChart products={this.state.products} />
                        : ""
                }

                <div className=" row">
                    <div className="text-left p-4 col-6">
                        {
                            this.props.appUser.user !== null && (this.props.appUser.user.role !== "CUSTOMER")?
                                <h4>
                                    <Link to={{pathname:`/products/create`}}>Create new</Link>
                                </h4>: ""
                        }

                    </div>
                </div>


                <div className="row text-center">
                    <div className=" col-12 container border  bg-light">
                        <h3 className="px-4 py-4  text-dark"><b>All products</b></h3>
                    </div>
                    <div className="col-12 text-center p-3">
                        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmitHandle}>
                            <div className="input-group col-sm-12 col-md-6 mx-auto">
                                <input className="form-control border rounded-left" value={this.state.term} onChange={this.onChangeHandle} name="term" type="search" placeholder="Search" aria-label="Search"/>
                                <div className="input-group-append input-group-sm">
                                    <button className="btn brn-sm btn-info border rounded-right pt-0 pb-0" type="submit"><span className="fa fa-search"></span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row w-100 mx-auto px-md-5 py-md-2 p-2">
                    {
                        this.state.products.length === 0 ?
                            <h3 className="px-5 py-2">Products not found</h3>
                            : this.state.products.map(p => <ProductItem appProps={this.props.appProps} appUser={this.props.appUser} item={p} key={p.id} id={p.id} handleDelete={this.removeHandle}/>)
                    }
                    </div>
                </div>

                <div className="m-0 p-3">
                    {this.paginationList()}
                </div>

            </div>
        )
    }

}

export default ProductIndex;
