import React, { Component } from 'react';
import ProductBar from './ProductBar';
import { connect } from 'react-redux';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            quantity: 1
        }
    }

    getQuantity = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    }

    addItemBtn = () => {
        this.props.addItem(
            {
                ...this.props.productItem,
                quantity: parseInt(this.state.quantity)
            }
        );

        console.log("prd: " + this.state.quantity);
        
        
        this.setState({
            isClicked: true
        });
    }

    showRate = () => {
        var result = [];
        for (let index = 0; index < this.props.productItem.star; index++) {
            result.push(<i className="fa fa-star" aria-hidden="true" />);
        }

        return result;
    }

    render() {
        return (
            <div className="single-product-area section-padding-100 clearfix">
                <div className="container-fluid">
                    <ProductBar />

                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className="single_product_thumb">
                                <div id="product_details_slider" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li className="active" data-target="#product_details_slider" data-slide-to={0} style={{ backgroundImage: 'url(img/product-img/pro-big-1.jpg)' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={1} style={{ backgroundImage: 'url(img/product-img/pro-big-2.jpg)' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={2} style={{ backgroundImage: 'url(img/product-img/pro-big-3.jpg)' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={3} style={{ backgroundImage: 'url(img/product-img/pro-big-4.jpg)' }}>
                                        </li>
                                    </ol>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <a className="gallery_img" href="img/product-img/pro-big-1.jpg">
                                                <img className="d-block w-100" src="img/product-img/pro-big-1.jpg" alt="First slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href="img/product-img/pro-big-2.jpg">
                                                <img className="d-block w-100" src="img/product-img/pro-big-2.jpg" alt="Second slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href="img/product-img/pro-big-3.jpg">
                                                <img className="d-block w-100" src="img/product-img/pro-big-3.jpg" alt="Third slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href="img/product-img/pro-big-4.jpg">
                                                <img className="d-block w-100" src="img/product-img/pro-big-4.jpg" alt="Fourth slide" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="single_product_desc text-left">
                                <div className="product-meta-data">
                                    <div className="line" />
                                    <p className="product-price">${this.props.productItem.price}</p>
                                    <a>
                                        <h6>{this.props.productItem.name}</h6>
                                    </a>

                                    {/* Ratings & Review */}
                                    <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                        <div className="ratings">
                                            {
                                                this.showRate()
                                            }
                                        </div>

                                    </div>

                                </div>
                                <div className="short_overview my-5">
                                    <p>{this.props.productItem.description}</p>
                                </div>

                                <div className="cart clearfix">
                                    <div className="cart-btn d-flex mb-50">
                                        <p>Qty:</p>
                                        <div className="quantity form-group">
                                            <input className="form-control qty-text" type="number" name="quantity" step={1} min={1} max={300} defaultValue={1} onChange={(event) => this.getQuantity(event)} />
                                        </div>
                                    </div>



                                    {(() => {
                                        if (this.state.isClicked)
                                            return (<div className="btn amado-btn" style={{ backgroundColor: "darkgreen" }}>
                                                Added to cart!
                                        </div>)

                                        else return (<div className="btn amado-btn" onClick={() => this.addItemBtn()}>
                                            Add to cart
                                    </div>)
                                    })()}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        productItem: state.productItem
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addItem: (item) => {
            dispatch({
                type: "ADD_CART_ITEM",
                item: item
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)