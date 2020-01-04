import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            ...this.props.item
        }
    }
    componentDidMount () {
        console.log('state nenenee',this.state);
    }
    showRate = () => {
        var result = [];
        for (let index = 0; index < this.props.item.star; index++) {
            result.push(<i className="fa fa-star" aria-hidden="true" />);
        }

        return result;
    }

    addToCartBtn = ()=>{
        console.log('item add to cart ne',this.props.item);
        fetch('http://localhost:5000/addtocart', {
            method: 'POST', //PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: this.props.item,
            }),
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
        this.props.addItem({
            ...this.props.item,
            quantity: 1
        });
    }

    render() {
        return (
            <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                <div className="single-product-wrapper">
                    {/* Product Image */}
                    <Link to="/detail">
                        <div className="product-img" onClick={() => this.props.setProductItem(this.props.item)}>
                            <img src={"img/product-img/" + this.props.item.imageURL +"1.jpg"} alt="" />
                            {/* Hover Thumb */}
                            <img className="hover-img" src={"img/product-img/" + this.props.item.imageURL +"2.jpg"} alt="" />
                        </div>
                    </Link>

                    {/* Product Description */}
                    <div className="product-description d-flex align-items-center justify-content-between">
                        {/* Product Meta Data */}
                        <div className="product-meta-data text-left">
                            <div className="line" />
                            <p className="product-price">${this.props.item.price}</p>
                            <h6>{this.props.item.name}</h6>
                        </div>
                        {/* Ratings & Cart */}
                        <div className="ratings-cart text-right">
                            <div className="ratings">

                                {this.showRate()}

                            </div>
                            <div className="cart" style={{cursor: "pointer"}} onClick={()=>{this.addToCartBtn()}}>
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
        },
        addItem: (x) => {
            dispatch({
                type: "ADD_CART_ITEM",
                item: x
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductItem);