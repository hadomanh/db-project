import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div className="mobile-nav">
                {/* Navbar Brand */}
                <div className="amado-navbar-brand">
                    <Link to="/home">
                    <img src="img/core-img/logo.png" alt="" />
                    </Link>
                </div>
                {/* Navbar Toggler */}
                <div className="amado-navbar-toggler">
                    <span /><span /><span />
                </div>
            </div>

        );
    }
}

export default Nav;