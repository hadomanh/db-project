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
            data: [],
            isCheckout: false
        }
    }

    getCart = () => {
        this.props.cart.then(data => {
            this.setState({
                data: data
            });
            console.log('data ne cart ne 2', this.state.data)
        });
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentDidMount() {
        this.props.cart.then(data => {
            this.setState({
                data: data
            });
            console.log('data ne card ne', this.state.data)
        });
    }


    render() {

        return (
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            {(
                                () => {
                                    if (this.state.isCheckout)
                                        return (
                                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                Thanks for your support!
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        )
                                }
                            )()}

                            {(
                                () => {
                                    if (this.props.checkout)
                                        return (<Checkout checkoutnow={()=>this.setState({ isCheckout: true })} />)
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