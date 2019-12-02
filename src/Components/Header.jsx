import React, { Component } from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className="header-area clearfix">
                {/* Close Icon */}
                <div className="nav-close">
                    <i className="fa fa-close" aria-hidden="true" />
                </div>
                {/* Logo */}
                <div className="logo">
                    <Link to="/home">
                        <img src="img/core-img/logo.png" alt="" />
                    </Link>
                </div>
                {/* Amado Nav */}
                <nav className="amado-nav">
                    <ul>
                        <li><a><NavLink to="/home" activeClassName="active">Home</NavLink></a></li>
                        <li><a>Checkout</a></li>
                    </ul>
                </nav>
                {/* Cart Menu */}
                <div className="cart-fav-search mb-100">
                    <NavLink to="/cart" activeClassName="active"><a className="cart-nav"><img src="img/core-img/cart.png" alt="" />Cart<span>(0)</span></a></NavLink>
                    <a className="search-nav"><img src="img/core-img/search.png" alt="" /> Search</a>
                </div>
                {/* Social Button */}
                <div className="social-info d-flex justify-content-between">
                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                </div>
            </header>

        );
    }
}

export default Header;