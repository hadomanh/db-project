import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: JSON.parse(window.localStorage.getItem("thongtin")).address
        }
    }

    handleAddress = (event) =>{
        this.setState({
            address: event.target.value
        });

        console.log(this.state.address);
        
    }

    checkoutBtn = async (event)=>{
        this.props.checkoutnow();
        this.props.checkoutBtn();
        event.preventDefault();

        try {
            const data = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    address:  this.state.address,
                }),
            }).then((res) => { return res.json(); });
            console.log('data check out', data);

            if (!data.success) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                //save data to localStorage
                console.log('thanks');
                // window.location.href = "/";
            }
        } catch (err) {
           console.log(err);
        }
    }

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
                            <input type="text" className="form-control" defaultValue={JSON.parse(window.localStorage.getItem("thongtin")).name} readOnly />
                        </div>

                        <div className="col-6 mb-3">
                            <small className="float-left">Email:</small>
                            <input type="email" className="form-control" defaultValue={JSON.parse(window.localStorage.getItem("thongtin")).email} readOnly />
                        </div>

                        <div className="col-5 mb-3">
                            <small className="float-left">Phone number:</small>
                            <input type="text" className="form-control" placeholder={JSON.parse(window.localStorage.getItem("thongtin")).phone} readOnly />
                        </div>

                        <div className="col-9 mb-3">
                            <small className="float-left">Address:</small>
                            <input type="text" className="form-control" onChange = {(event)=>this.handleAddress(event)} defaultValue={JSON.parse(window.localStorage.getItem("thongtin")).address} required />
                        </div>

                        <div className="col-12">
                            <div className="btn amado-btn mt-3" onClick={this.checkoutBtn} style={{ fontSize: 15 }}>
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