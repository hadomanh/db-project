import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from "../Store/Store";

class CartTotal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: this.getTotal()
        }
    }


    getTotal = () => {
        var total = 0;

        this.props.cart.map((item) => {
            total += item.quantity * item.price;
        });

        return total;

    }

    render() {
        
        Store.subscribe(()=>{
            this.setState({
                total: this.getTotal()
            });
        })


        return (
            <div className="col-12 col-lg-4">
                <div className="cart-summary">
                    <h5>Cart Total</h5>
                    <ul className="summary-table">
                        <li><span>subtotal:</span> <span>${this.state.total}</span></li>
                        <li><span>delivery:</span> <span>Free</span></li>
                        <li><span>total:</span> <span>${this.state.total}</span></li>
                    </ul>
                    <div className="cart-btn mt-100">
                        <a className="btn amado-btn w-100">Checkout</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(CartTotal)