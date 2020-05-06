import React from 'react';

import ProductService from '../../service/ProductService';

import HomeProductItem from './HomeProductItem';
import ProductIndex from "../Product/productIndex";

class Home extends React.Component {

    constructor(props){
        super(props);
        // console.log("PRODUCT INDEX")
        console.log(props);

        this.state = {
            'mostViewed': []
        };
    }

    componentDidMount() {
        this.getMostViewed();
    }

    getMostViewed(){
        ProductService.getMostViewedProducts(6).then((resp) => {
            console.log(resp.data);

            this.setState((prevState) => {
                const newValue = {
                    'mostViewed': resp.data.content,
                };
                const newState = {
                    ...prevState,
                    ...newValue
                };

                return newState;
            });
        }, (err) => {
            console.log("no content");
        });

    }

    render() {


        return (
            <div className=" mt-3  mb-3">
                <div className="container text-center bg-white pt-4 px-0 mt-5" style={{minHeight: 600+"px"}}>
                    <div className=" col-12 container border  bg-light my-3 ">
                        <h3 className="px-4 py-4  text-dark"><b>Most viewed products</b></h3>
                    </div>
                    {
                        this.state.mostViewed.length === 0 ?
                            <h3 className="p-5 text-left">Products not found</h3>
                            :
                            <div id="carouselExampleIndicators " className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner row">
                                    <div className="carousel-item active row pl-5">
                                        {
                                            this.state.mostViewed.map(p => <HomeProductItem
                                                appProps={this.props.appProps} appUser={this.props.appUser} item={p}
                                                key={p.id} id={p.id}/>).slice(0, 3)
                                        }
                                    </div>
                                    {
                                        this.state.mostViewed.length > 3 ?
                                        <div className="carousel-item row pl-5">
                                            {
                                                this.state.mostViewed.map(p => <HomeProductItem
                                                    appProps={this.props.appProps} appUser={this.props.appUser} item={p}
                                                    key={p.id} id={p.id}/>).slice(3, 6)
                                            }
                                        </div> : ""
                                    }
                                </div>
                                <a className="carousel-control-prev " href="#carouselExampleIndicators" role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next " href="#carouselExampleIndicators" role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon " aria-hidden="true"></span>
                                    <span className="sr-only ">Next</span>
                                </a>
                            </div>
                    }
                </div>

                <ProductIndex {...this.props} appProps={this.props.appProps} appUser={this.props.appUser} appUserCart={this.props.appUserCart} />

            </div>
        )
    }

}

export default Home;
