import React from 'react';
import {Link} from 'react-router-dom'


class Footer extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div>
                 {/*Footer */}
                <footer className="footer font-small  text-center ">

                     {/*Footer Elements */}
                    <div className="container">

                         {/*Grid row-->*/}
                        <div className="row">

                             {/*Grid column -->*/}
                            <div className="col-md-12 py-5">
                                <div className="mb-5 flex-center">

                                     {/*Facebook -->*/}
                                    <Link className="fb-ic" style={{color: '#fff3cd'}} to={{pathname:`facebook.com`}}>
                                        <i className="fa fa-facebook fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </Link>
                                     {/*Twitter -->*/}
                                    <Link className="tw-ic" style={{color: '#fff3cd'}} to={{pathname:`facebook.com`}}>
                                        <i className="fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </Link>
                                     {/*Google +-->*/}
                                    <Link className="gplus-ic" style={{color: '#fff3cd'}} to={{pathname:'google.com'}}>
                                        <i className="fa fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </Link>
                                    {/*Linkedin -->*/}
                                    <Link className="li-ic" style={{color: '#fff3cd'}} to={{pathname: 'linkedin.com'}}>
                                        <i className="fa fa-linkedin fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </Link>
                                    {/*Instagram-->*/}
                                    <Link className="ins-ic" style={{color: '#fff3cd'}} to={{pathname: "instagram.com"}}>
                                        <i className="fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </Link>
                                    {/*Pinterest-->*/}
                                    <Link className="pin-ic" style={{color: '#fff3cd'}} to={{pathname: "pinterest.com"}}>
                                        <i className="fa fa-pinterest fa-lg white-text fa-2x"> </i>
                                    </Link>
                                </div>
                            </div>
                            {/*Grid column -->*/}

                        </div>
                         {/*Grid row-->*/}

                    </div>
                     {/*Footer Elements -->*/}

                     {/*Copyright -->*/}
                    <div className="footer-copyright text-center py-3 text-light">© 2018 Copyright:</div>
                     {/*Copyright -->*/}

                </footer>
                 {/*Footer -->*/}
            </div>
        )
    }
}

export default Footer;
