import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from "react-router-dom";

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentWillMount() {
        this.setState(this.props.item);
    }



    showRate = () => {
        var result = [];
        for (let index = 0; index < this.state.star; index++) {
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
                        <div className="product-img" onClick={() => this.props.setProductItem(this.state)}>
                            <img src="img/product-img/product2.jpg" alt="" />
                            {/* Hover Thumb */}
                            <img className="hover-img" src="img/product-img/product3.jpg" alt="" />
                        </div>
                    </Link>

                    {/* Product Description */}
                    <div className="product-description d-flex align-items-center justify-content-between">
                        {/* Product Meta Data */}
                        <div className="product-meta-data text-left">
                            <div className="line" />
                            <p className="product-price">${this.state.price}</p>
                            <h6>{this.state.name}</h6>

                        </div>
                        {/* Ratings & Cart */}
                        <div className="ratings-cart text-right">
                            <div className="ratings">

                                {this.showRate()}

                            </div>
                            <div className="cart">
                                <a data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setProductItem: (data) => {
            dispatch({ type: "SET_PRODUCT_ITEM", item: data })
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductItem);