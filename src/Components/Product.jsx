import React, { Component } from 'react';
import ProductBar from './ProductBar';
import { connect } from 'react-redux';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            quantity: 1,
            isDelete: false
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

        this.setState({
            isClicked: true
        });

        fetch('http://localhost:5000/addtocart', {
            method: 'POST', //PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: this.props.productItem,
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

    }

    handleDelete = async (event) => {
        event.preventDefault();

        try {
            const data = await fetch("http://localhost:5000/delProduct", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    item: this.props.productItem
                }),
            }).then((res) => { return res.json(); });
            console.log('data delete product', data);
            if (!data.success) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                //save data to localStorage
                console.log('oke')
                // window.location.href = "/";

                this.setState({ isDelete: true })

            }
        } catch (err) {
            this.setState({
                errMessage: err.message
            });
        }
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
                                        <li className="active" data-target="#product_details_slider" data-slide-to={0} style={{ backgroundImage: 'url(img/product-img/' + this.props.productItem.imageURL + '1.jpg' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={1} style={{ backgroundImage: 'url(img/product-img/' + this.props.productItem.imageURL + '2.jpg' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={2} style={{ backgroundImage: 'url(img/product-img/' + this.props.productItem.imageURL + '3.jpg' }}>
                                        </li>
                                        <li data-target="#product_details_slider" data-slide-to={3} style={{ backgroundImage: 'url(img/product-img/' + this.props.productItem.imageURL + '4.jpg' }}>
                                        </li>
                                    </ol>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <a className="gallery_img" href={"img/product-img/" + this.props.productItem.imageURL + "1.jpg"}>
                                                <img className="d-block w-100" src={"img/product-img/" + this.props.productItem.imageURL + "1.jpg"} alt="First slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href={"img/product-img/" + this.props.productItem.imageURL + "2.jpg"}>
                                                <img className="d-block w-100" src={"img/product-img/" + this.props.productItem.imageURL + "2.jpg"} alt="Second slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href={"img/product-img/" + this.props.productItem.imageURL + "3.jpg"}>
                                                <img className="d-block w-100" src={"img/product-img/" + this.props.productItem.imageURL + "3.jpg"} alt="Third slide" />
                                            </a>
                                        </div>
                                        <div className="carousel-item">
                                            <a className="gallery_img" href={"img/product-img/" + this.props.productItem.imageURL + "4.jpg"}>
                                                <img className="d-block w-100" src={"img/product-img/" + this.props.productItem.imageURL + "4.jpg"} alt="Fourth slide" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="single_product_desc text-left">
                                <div className="product-meta-data">


                                    {(
                                        () => {
                                            if (this.state.isDelete)
                                                return (
                                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        Item deleted!
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )
                                        }
                                    )()}


                                    <div className="line" />
                                    <p className="product-price">${this.props.productItem.price}</p>
                                    <a>
                                        <h6>{this.props.productItem.name}</h6>
                                    </a>

                                    {(
                                        () => {
                                            if (JSON.parse(localStorage.getItem('thongtin')).permission === 1)
                                                return (
                                                    <div className="btn btn-outline-danger" onClick={(event) => this.handleDelete(event)}>Delete</div>
                                                )
                                        }
                                    )()}

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
                                    {/* <div className="cart-btn d-flex mb-50">
                                        <p>Qty:</p>
                                        <div className="quantity form-group">
                                            <input className="form-control qty-text" type="number" name="quantity" step={1} min={1} max={300} defaultValue={1} onChange={(event) => this.getQuantity(event)} />
                                        </div>
                                    </div> */}





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