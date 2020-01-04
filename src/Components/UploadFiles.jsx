import React, { PureComponent } from 'react'

class UploadFiles extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            price: '',
            des: '',
            image:'',
            permission: 0,
            isClicked: false
        }
    }

    componentDidMount() {
        const that = this;
        try {
            fetch('http://localhost:5000/upload', {
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

                    that.setState({
                        permission: data.data.permission
                    });
                    console.log(' Data upload ne:', data);
                    console.log('permission front end ne', that.state.permission);
                })
                .catch(function (err) {
                    console.log(err);
                    window.alert(err.message);
                })
        } catch (err) {
            console.log(err);
        }
    }



    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
        console.log(this.state.name);
    }

    handlePriceChange = (event) => {
        this.setState({
            price: event.target.value
        });
        console.log(this.state.price);
    }


    handleDesChange = (event) => {
        this.setState({
            des: event.target.value
        });
        console.log(this.state.des);
    }


    handleImageChange = (event) => {
        this.setState({
            image: event.target.value
        });
        console.log(this.state.image);
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await fetch("http://localhost:5000/addProduct", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    price: this.state.price,
                    des: this.state.des,
                    image: this.state.image
                }),
            }).then((res) => { return res.json(); });
            console.log('data addproduct', data);
            this.setState({
                isClicked: true
            })

        } catch (err) {
            console.log(err.message);
        }
    }
    render() {

        return (
            <div className="cart-table-area section-padding-100">

                {
                    (() => {
                        if (this.state.permission === 1)
                            return (
                                <div className="container">

                                    {(()=>{
                                        if(this.state.isClicked === true)
                                        return(
                                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                                Added successful!
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>)
                                    })()}

                                    <div className="cart-tile">
                                        <h2>Upload item</h2>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-9 text-left"><small>Name:</small></div>
                                            <div className="col-3"></div>
                                            <input type="text" className="form-control col-6" onChange={this.handleNameChange} placeholder="Item name..." required />
                                        </div>

                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-9 text-left"><small>ImageURL:</small></div>
                                            <div className="col-3"></div>
                                            <input type="text" className="form-control col-6" onChange={this.handleImageChange} placeholder="Image name..." required />
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-3"></div>
                                            <div className="col-9 text-left"><small>Price:</small></div>
                                            <div className="col-3"></div>
                                            <input type="number" className="form-control col-6" onChange={this.handlePriceChange} placeholder="Price..." required />
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-3"></div>
                                            <div className="col-9 text-left"><small>Description:</small></div>
                                            <div className="col-3"></div>
                                            <textarea className="col-6" onChange={this.handleDesChange} placeholder="About this product..." name="" id="" cols="30" rows="5"></textarea>
                                        </div>

                                        <div className="btn amado-btn mt-3" onClick={this.handleSubmit} style={{ fontSize: 15 }}>
                                            Add to store
                                            </div>

                                    </div>
                                </div>

                                // </div>

                            )
                        else return (<h1>warning</h1>)
                    })()
                }

            </div>
        )






    }
}

export default UploadFiles;