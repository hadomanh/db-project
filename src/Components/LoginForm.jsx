import React, { PureComponent } from 'react'
import {
    Link,
    NavLink
} from "react-router-dom";

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            pass: "",
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

    handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.pass
                }),
            }).then((res) => { return res.json(); });
            console.log('data frontend login', data);

            if (!data.success) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                //save data to localStorage
                window.localStorage.setItem("email", data.data.email);
                // window.location.href = "/";
            }
        } catch (err) {
            this.setState({
                errMessage: err.message
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="cart-table-area section-padding-100">
                <div className="container">
                    <div className="cart-tile">
                        <h2>Login</h2>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-3"></div>
                            <input type="email" className="form-control col-6" placeholder="Email" required onChange={this.handleEmailChange} />
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col-3"></div>
                            <input type="password" className="form-control col-6" placeholder="Password" required onChange={this.handlePasswordChange} />
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col-3"></div>
                            <div className="col-6 text-left"><Link to="/register">Register now</Link></div>
                            
                        </div>

                        <div className="btn amado-btn mt-3" style={{ fontSize: 15 }} onClick={this.handleLogin}>
                            Sign in
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}

export default Login