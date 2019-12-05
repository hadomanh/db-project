import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartItem extends Component {

    constructor(props) {
        super(props);
        this.state = {...this.props.item}
    }

    getQuantity = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
        this.props.changeQuantity({...this.props.item, quantity:parseInt(event.target.value)});
        console.log("getQuantity");
        
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