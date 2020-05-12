import React from 'react';

import CartService from '../../../../service/CartService';
import AllOrderCartItem from "./AllOrderCartItem";

import ReactPaginate from 'react-paginate'
import Cookies from "js-cookie";


class AllOrders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'orders': [],
            'page': 0,
            'size': 5,
            'totalPages': 0
        }
    }

    componentDidMount() {
        this.getAllOrders();
    }

    getAllOrders(page = this.state.page, size = this.state.size){
        CartService.getAllOrders(page,size).then((resp) => {
            this.setState((prevState) => {
                const newValue = {
                    'orders': resp.data.content,
                    'page': resp.data.pageable.pageNumber,
                    'size': resp.data.size,
                    'totalPages': resp.data.totalPages
                };

                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            }, () => {console.log(this.state)})

        }, (err) => {
            alert("ERROR");
            console.log(err.response.statusText);
        })
    }
    
    onChangeHandle = (e) => {
        debugger;
        let name = e.target.name;
        let value = e.target.value;


        this.setState((prevState) => {
            let orders = [];

            prevState.orders.forEach(o => {
                if(o.id === name){
                    o.delivered = value;
                    //TREBE DA GO ZACUVAM DEKA E ISPRATENO
                    const cartRequest = {
                        'id' : o.id,
                        'status': o.status,
                        'delivered': o.delivered,
                        'deliveryAddress': o.deliveryAddress,
                        'totalPrice': o.totalPrice
                    };

                    let token = Cookies.get("token");
                    // const token = JSON.parse(tok.replace(new RegExp(/'/g), '"'));

                    CartService.updateCart(cartRequest, token).then((resp) => {
                      o = resp.data;
                    }, (err) => {
                        console.log(err.response.statusText);
                        alert("error");
                    });
                }
                orders.push(o);
            });

            const newValue = {
                'orders': orders
            };

            const newState = {
                ...prevState,
                ...newValue
            };

            return newState;
        }, () => {console.log(this.state)})
    };

    handlePageClick = (pageChangedEvent) => {
        this.getAllOrders(pageChangedEvent.selected)
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
            <div className="container mt-5 bg-white">
                <div className="row pt-5 ml-md-4 mr-md-3 ">
                    <div className={"col-sm-2"}>
                        <h5>User</h5>
                    </div>
                    <div className={"col-sm-3"}>
                        <h5>Order date</h5>
                    </div>
                    <div className={"col-sm-2"}>
                        <h5>Total Price</h5>
                    </div>
                    <div className={"col-sm-3"}>
                        <h5>Address</h5>
                    </div>
                    <div className={"col-sm-2"}>
                        <h5>Status</h5>
                    </div>


                </div>
                <div className="mt-5 border-top py-3 border-bottom">
                    {
                        this.state.orders.length === 0 ?
                            <h3 className="p-5">Orders not found</h3>
                            : this.state.orders.map(p => <AllOrderCartItem appProps={this.props.appProps} appUser={this.props.appUser} item={p} key={p.id} id={p.id} value={p.delivered} onChangeHandle={this.onChangeHandle} handleDelete={this.handleDelete}/>)
                    }
                </div>


                {
                    this.state.totalPages !== 1 ?
                        <div className="m-0 p-3">
                            {this.paginationList()}
                        </div> : ""
                }

            </div>
        )
    }
}

export default AllOrders;
