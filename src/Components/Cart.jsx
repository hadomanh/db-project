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
<<<<<<< HEAD

=======
            data: []
>>>>>>> 4b65e559e4f5d3e19b425290056db3a9f8706cb4
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
<<<<<<< HEAD
                            
                            {(
                                () => {
                                    if (this.props.checkout)
                                        return (<Checkout />)
                                    else
                                        return (<CartDetail />)
                                }
                            )()}
=======
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
                                            this.state.data.map((item) => (
                                                <CartItem item={item} />
                                            ))
                                        }
>>>>>>> 4b65e559e4f5d3e19b425290056db3a9f8706cb4

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