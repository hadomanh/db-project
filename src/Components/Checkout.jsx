import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkout extends Component {
    render() {
        return (
            <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-title">
                    <h2>Checkout</h2>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <small className="float-left">Name:</small>
                            <input type="text" className="form-control" defaultValue="Do Manh Ha" readOnly />
                        </div>

                        <div className="col-6 mb-3">
                            <small className="float-left">Email:</small>
                            <input type="email" className="form-control" defaultValue="hadomanh99@gmail.com" readOnly />
                        </div>

                        <div className="col-5 mb-3">
                            <small className="float-left">Phone number:</small>
                            <input type="text" className="form-control" placeholder="0344982572" readOnly />
                        </div>

                        <div className="col-9 mb-3">
                            <small className="float-left">Address:</small>
                            <input type="text" className="form-control" defaultValue="Hoang Mai, Ha Noi" readOnly />
                        </div>

                        <div className="col-12">
                            <div className="btn amado-btn mt-3" style={{ fontSize: 15 }}>
                                Confirm
                            </div>
                            <div className="btn amado-btn mt-3 ml-3" onClick={this.props.checkoutBtn} style={{ fontSize: 15, backgroundColor: "#131212" }}>
                                Cancel
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkoutBtn: () => {
            dispatch({type: "CHECKOUT_BTN_CLICK"})
        }
    }
}

export default connect(null, mapDispatchToProps)(Checkout)