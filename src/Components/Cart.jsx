import React, { Component } from 'react';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

class Cart extends Component {
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
                                        <CartItem name="Modern White Chair" price={150}/>
                                        <CartItem name="Modern White Chair" price={150}/>
                                        <CartItem name="Modern White Chair" price={150}/>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        
                        <CartTotal total={450}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default Cart;