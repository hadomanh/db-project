import React, { Component } from 'react';

import { connect } from 'react-redux';
import CartItem from './CartItem';

class CartDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.cart.then(data => {
            this.setState({
                data: data
            });
            console.log('data ne cart ne <cartdetail>', this.state.data)
        });
    }

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
                                this.state.data.map((item) => {
                                    if(item.quantity > 0) return(<CartItem item={item} />)}
                                    
                                )
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