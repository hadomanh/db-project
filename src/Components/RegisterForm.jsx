import React, { Component } from 'react';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    

    render() {
        return (
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="checkout_details_area mt-50 clearfix">
                                <div className="cart-title">
                                    <h2>Register</h2>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" placeholder="First Name" required />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" required />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="email" className="form-control" placeholder="Email" required />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="password" className="form-control" placeholder="Password" required />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="password" className="form-control" placeholder="Confirm password" required />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control mb-3" placeholder="Address" required />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" placeholder="Phone No" required />
                                        </div>

                                        <div className="col-12">
                                            <div className="btn amado-btn col-12 mt-3" style={{fontSize:15}}>
                                                Sign up
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default RegisterForm;