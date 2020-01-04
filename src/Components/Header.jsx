import React, { Component } from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {

    handleLogOut = () => {
        fetch('http://localhost:5000/upload', {
            method: 'GET', //PUT
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(function (response) {
                //response.JSON() -> only when server response with json
                //response.text() -> only when server response with string
                return response.json();

            })
            .then(function (data) {
                // handle response data
                console.log(' Data:', data);
                console.log('data message ne', data.message);
            })
            .catch(function (err) {
                console.log(err);
                window.alert(err.message);
            })
    }

    render() {

        var button = [];
        button.push(<li><a><NavLink to="/login">Login</NavLink></a></li>);
        button.push(<li><a><NavLink to="/register">Register</NavLink></a></li>);

        return (
            <header className="header-area clearfix">
                {/* Close Icon */}
                <div className="nav-close">
                    <i className="fa fa-close" aria-hidden="true" />
                </div>
                {/* Logo */}
                <div className="logo">
                    <a href="/">
                        <img src="img/core-img/logo.jpg" alt="" />
                    </a>
                </div>
                {/* Amado Nav */}
                <nav className="amado-nav">
                    <ul>
                        <li><a href='/'>Home</a></li>

                        {(
                            () => {
                                if (localStorage.getItem('thongtin')) {
                                    if (JSON.parse(localStorage.getItem('thongtin')).permission === 1)
                                        return (
                                            <li><a><NavLink to="/upload">Upload item</NavLink></a></li>
                                        )
                                }

                            }
                        )()}

                        {(() => {
                            if (window.localStorage.getItem("thongtin"))
                                return (
                                    <li><a href="/" onClick={() => localStorage.clear()}>Log out</a></li>)

                            else return button

                        })()}

                    </ul>
                </nav>
                {/* Cart Menu */}
                {/* <div className="cart-fav-search mb-100">
                    <NavLink to="/cart" activeClassName="active"><a className="cart-nav"><img src="img/core-img/cart.png" alt="" />Cart<span>({this.props.cart.length})</span></a></NavLink>
                </div> */}

                {(() => {
                    if (window.localStorage.getItem("thongtin"))
                        return (<div className="cart-fav-search mb-100">
                            <a className="cart-nav" href="/cart"><img src="img/core-img/cart.png" alt="" />Cart<span>({this.props.cart.length})</span></a>
                        </div>)
                })()}

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

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Header)