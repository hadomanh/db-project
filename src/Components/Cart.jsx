import React, { Component } from 'react';
import CartTotal from './CartTotal';
import { connect } from 'react-redux';
import Store from '../Store/Store';
import Checkout from './Checkout';
import CartDetail from './CartDetail';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        return (
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            
                            {(
                                () => {
                                    if (this.props.checkout)
                                        return (<Checkout />)
                                    else
                                        return (<CartDetail />)
                                }
                            )()}

                        </div>


                        <CartTotal />

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        checkout: state.checkout
    }
}

export default connect(mapStateToProps)(Cart);