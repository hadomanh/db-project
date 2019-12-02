import React, { Component } from 'react';

class CartItem extends Component {
    render() {
        return (
            <tr>
                <td className="cart_product_img">
                    <a><img src="img/bg-img/cart1.jpg" alt="Product" /></a>
                </td>
                <td className="cart_product_desc">
                    <h5>{this.props.name}</h5>
                </td>
                <td className="price">
                    <span>${this.props.price}</span>
                </td>
                <td className="qty">
                    <div className="qty-btn d-flex">
                        <p>Qty</p>
                        <div className="quantity">
                            <span className="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) && qty > 1 ) effect.value--;return false;"><i className="fa fa-minus" aria-hidden="true" /></span>
                            <input type="number" className="qty-text" id="qty" step={1} min={1} max={300} name="quantity" defaultValue={1} />
                            <span className="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i className="fa fa-plus" aria-hidden="true" /></span>
                        </div>
                    </div>
                </td>
            </tr>

        );
    }
}

export default CartItem;