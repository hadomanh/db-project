import React, { Component } from 'react';

class ShopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    setText = (event) => {
        this.props.searchFor(event.target.value)
    }

    handleChange = (event) =>{
        localStorage.setItem("orderby", event.target.value);
        window.location.reload();
    }


    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                        {/* Total Products */}
                        <div className="form-group">
                            <div className="btn-group">
                                <input type="text" className="form-control col-12" aria-describedby="helpId" onChange={(event) => this.setText(event)} placeholder="Search for..." />
                                <div className="btn btn-warning text-light">Go</div>
                            </div>
                        </div>
                        {/* Sorting */}
                        <div className="product-sorting d-flex">
                            <div className="input-group sort-by-date d-flex align-items-center mr-15">
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">Price:</span>
                                </div>
                                <div>
                                    <select className="form-control" onChange={(event)=>this.handleChange(event)}>
                                        <option selected value="1">None</option>
                                        <option value="2">High - Low</option>
                                        <option value="3">Low - High</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopBar;