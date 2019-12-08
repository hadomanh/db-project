import React, { PureComponent } from 'react'

class RegisterPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email:'',
            pass:'',
            repeatPass:'',
            name:'',
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

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
        console.log(this.state.name);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.pass !== this.state.repeatPass) { document.querySelector('.canhbao').innerText='Password and Repeat Pass dont match'; }
        else 
        if(this.state.pass.length <6 ) {document.querySelector('.canhbao1').innerText="Password must be more than 6 characters"}
        
        else
        
        {
            fetch('http://localhost:5000/users/register', {
                method: 'POST', //PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.pass,
                    repeatPass: this.state.repeatPass,
                    name: this.state.name
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
                    console.log('data message ne',data.message);
                    if(data.message==='Email has been used') 
                    {
                        document.querySelector('.canhbao2').innerHTML='Email has been used';
                    }
                    else{
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
            <div classname="limiter" style={{backgroundColor: '#999999'}}>
  <div className="container-login100">
    <div className="login100-more" style={{backgroundImage: 'url("images/bg-01.jpg")'}} />
    <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
      <form className="login100-form validate-form">
        <span className="login100-form-title p-b-59">
          Sign Up
        </span>
        <div className="wrap-input100 validate-input" data-validate="Name is required">
          <span className="label-input100">Full Name</span>
          <input className="input100" type="text" name="name" placeholder="Name..."onChange={this.handleNameChange} />
          <span className="focus-input100" />
        </div>
        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <span className="label-input100">Email</span>
          <div className='canhbao2'></div>
          <input className="input100" type="text" name="email" placeholder="Email addess..." onChange={this.handleEmailChange} />
          <span className="focus-input100" />
        </div>
        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <span className="label-input100">Password</span>
          <input className="input100" type="password" name="pass" placeholder="*************" onChange={this.handlePasswordChange} />
          <div className='canhbao1'></div>
          <span className="focus-input100" />
        </div>
        <div className="wrap-input100 validate-input" data-validate="Repeat Password is required">
          <span className="label-input100">Repeat Password</span>
          <div className='canhbao'></div>
          <input className="input100" type="password" name="repeat-pass" placeholder="*************" onChange={this.handleRepeatPasswordChange} />
          <span className="focus-input100" />
        </div>
        <div className="flex-m w-full p-b-33">
          <div className="contact100-form-checkbox">
            <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
            <label className="label-checkbox100" htmlFor="ckb1">
              <span className="txt1">
                I agree to the
                <a href="#" className="txt2 hov1">
                  Terms of User
                </a>
              </span>
            </label>
          </div>
        </div>
        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn">
            <div className="login100-form-bgbtn" />
            <button className="login100-form-btn" onClick={this.handleFormSubmit}>
              Sign Up
            </button>
          </div>
          <a href="#" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
            Sign in
            <i className="fa fa-long-arrow-right m-l-5" />
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

        )
    }
}

export default RegisterPage