import React, { Component } from 'react';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { connect } from 'react-redux';
import Store from '../Store/Store';

class Cart extends Component {

    constructor(props) {
        super(props);

    }

    getTotal = () => {
        var total = 0;

        Store.getState().cart.map((item) => {
            total += item.quantity * item.price;
        });

        return total;

    }


    render() {
        return (
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
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


                        <CartTotal total={this.getTotal()}/>
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

export default connect(mapStateToProps)(Cart);