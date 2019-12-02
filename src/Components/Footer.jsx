import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer className="footer_area clearfix">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Single Widget Area */}
                        <div className="col-12 col-lg-4">
                            <div className="single_widget_area">
                                {/* Logo */}
                                <div className="footer-logo mr-50">
                                    <a href="index.html"><img src="img/core-img/logo2.png" alt="" /></a>
                                </div>
                                {/* Copywrite Text */}
                                <p className="copywrite">
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    Copyright ©
                                    All rights reserved | This
            template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                </p></div>
                        </div>
                        {/* Single Widget Area */}
                        <div className="col-12 col-lg-8">
                            <div className="single_widget_area">
                                {/* Footer Menu */}
                                <div className="footer_menu">
                                    <nav className="navbar navbar-expand-lg justify-content-end">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#footerNavContent" aria-controls="footerNavContent" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" /></button>
                                        <div className="collapse navbar-collapse" id="footerNavContent">
                                            <ul className="navbar-nav ml-auto">
                                                <li className="nav-item active">
                                                    <Link to="/home"><a className="nav-link">Home</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/cart"><a className="nav-link">Cart</a></Link>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">Checkout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;