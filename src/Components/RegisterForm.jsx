import React, { Component } from 'react';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            repeatPass: '',
            name: '',
            address: '',
            phoneno: '',
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
        console.log(this.state.email);
    }

    handlePasswordChange = (event) => {
        this.setState({
            pass: event.target.value
        });
        console.log(this.state.pass);
    }



    handleRepeatPasswordChange = (event) => {
        this.setState({
            repeatPass: event.target.value
        });
        console.log(this.state.repeatPass);
    }

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        });
        console.log(this.state.address);
    }

    handlePhoneNoChange = (event) => {
        this.setState({
            phoneno: event.target.value
        });
        console.log(this.state.phoneno);
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
        console.log(this.state.name);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.pass !== this.state.repeatPass) { document.querySelector('.canhbao').innerText = 'Password and Repeat Pass dont match'; }
        else
            if (this.state.pass.length < 6) { document.querySelector('.canhbao1').innerText = "Password must be more than 6 characters" }

            else {
                fetch('http://localhost:5000/users/register', {
                    method: 'POST', //PUT
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.pass,
                        repeatPass: this.state.repeatPass,
                        name: this.state.name,
                        // address: this.state.address,
                        // phoneno: this.state.phoneno,

                    }),
                })
                    .then(function (response) {
                        //response.JSON() -> only when server response with json
                        //response.text() -> only when server response with string
                        return response.json();

                    })
                    .then(function (data) {
                        // handle response data
                        console.log(' Data:', data);
                        console.log('data message ne', data.message);
                        if (data.message === 'Email has been used') {
                            document.querySelector('.canhbao2').innerHTML = 'Email has been used';
                        }
                        else {
                            // window.location.href=`/users/login `;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        window.alert(err.message);
                    })
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
                                <div className="form-group" >
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" placeholder="Name" required onChange={this.handleNameChange} />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="email" className="form-control" placeholder="Email" required onChange={this.handleEmailChange} />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="password" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange} />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="password" className="form-control" placeholder="Confirm password" required onChange={this.handleRepeatPasswordChange} />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control mb-3" placeholder="Address" required onChange={this.handleAddressChange} />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" placeholder="Phone No" required onChange={this.handlePhoneNoChange} />
                                        </div>

                                        <div className="col-12">
                                            <div className="btn amado-btn col-12 mt-3" style={{ fontSize: 15 }} onClick={this.handleFormSubmit}>
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