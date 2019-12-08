import React, { PureComponent } from 'react'

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email:'',
            pass:'',
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
            console.log('data frontend login',data);

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
            <div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
      <form className="login100-form validate-form flex-sb flex-w">
        <span className="login100-form-title p-b-32">
          Account Login
        </span>
        <span className="txt1 p-b-11" >
          Username
        </span>
        <div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
          <input className="input100" type="text" name="username"onChange={this.handleEmailChange}
                                    required/>
          <span className="focus-input100" />
        </div>
        <span className="txt1 p-b-11">
          Password
        </span>
        <div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
          <span className="btn-show-pass">
            <i className="fa fa-eye" />
          </span>
          <input className="input100" type="password" name="pass" onChange={this.handlePasswordChange}
                                    required />
          <span className="focus-input100" />
        </div>
        <div className="flex-sb-m w-full p-b-48">
          <div className="contact100-form-checkbox">
            <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
            <label className="label-checkbox100" htmlFor="ckb1">
              Remember me
            </label>
          </div>
          <div>
            <a href="#" className="txt3">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="container-login100-form-btn">
          <button className="login100-form-btn" onClick={this.handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

        )
    }
}

export default Login