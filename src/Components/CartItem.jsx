import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.item}
    }

    getQuantity = (event) => {
        fetch('http://localhost:5000/updateitem', {
            method: 'POST', //PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: this.props.item,
                quantity: event.target.value,
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
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
        this.props.changeQuantity({...this.props.item, quantity:parseInt(event.target.value)});
        console.log("getQuantity", this.state.productID);
        
    }

    render() {
        return (
            <tr>
                <td className="cart_product_img">
                    <a><img src="img/bg-img/cart1.jpg" alt="Product" /></a>
                </td>
                <td className="cart_product_desc">
                    <h5>{this.state.name}</h5>
                </td>
                <td className="price">
                    <span>${this.state.price}</span>
                </td>
                <td className="qty">
                    <div className="qty-btn d-flex">
                        <p>Qty:</p>
                        <div className="quantity">
                            <input type="number" className="qty-text" step={1} min={1} max={300} name="quantity" onChange={(event) => this.getQuantity(event)} defaultValue={this.props.item.quantity} />
                        </div>
                    </div>
                </td>
            </tr>

        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeQuantity: (item) => {
            dispatch(
                {
                    type: "CHANGE_QUANTITY",
                    item: item
                }
            )
        }
    }
}

export default connect(null, mapDispatchToProps)(CartItem)