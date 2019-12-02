import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

class ProductItem extends Component {

    showRate = ()=>{
        var result = [];
        for (let index = 0; index < this.props.star; index++) {
            result.push(<i className="fa fa-star" aria-hidden="true" />);
        }
        
        return result;
    }

    render() {
        return (
            <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                <div className="single-product-wrapper">
                    {/* Product Image */}
                    <Link to="/detail">
                        <div className="product-img">
                            <img src="img/product-img/product2.jpg" alt="" />
                            {/* Hover Thumb */}
                            <img className="hover-img" src="img/product-img/product3.jpg" alt="" />
                        </div>
                    </Link>

                    {/* Product Description */}
                    <div className="product-description d-flex align-items-center justify-content-between">
                        {/* Product Meta Data */}
                        <div className="product-meta-data">
                            <div className="line" />
                            <p className="product-price">${this.props.price}</p>
                            <Link to="/detail">
                                <h6>{this.props.name}</h6>
                            </Link>

                        </div>
                        {/* Ratings & Cart */}
                        <div className="ratings-cart text-right">
                            <div className="ratings">

                                {this.showRate()}

                            </div>
                            <div className="cart">
                                <a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductItem;