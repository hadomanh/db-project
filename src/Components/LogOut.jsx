import React, { PureComponent } from 'react'

class LogOut extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount(){
        localStorage.clear();
        fetch('http://localhost:5000/logout', {
            method: 'GET', //PUT
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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
            })
            .catch(function (err) {
                console.log(err);
                window.alert(err.message);
            })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default LogOut