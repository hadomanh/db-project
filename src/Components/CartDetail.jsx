import React, { Component } from 'react';

import { connect } from 'react-redux';
import CartItem from './CartItem';

class CartDetail extends Component {
    render() {
        return (
            <div>
                <div className="cart-title mt-50">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-table clearfix">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th />
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                this.props.cart.map((item) => (
                                    <CartItem item={item} />
                                ))
                            }

                        </tbody>
                    </table>
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

export default connect(mapStateToProps)(CartDetail);