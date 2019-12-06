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


    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                        {/* Total Products */}
                        <div className="form-group">
                            <div className="btn-group">
                                <input type="text" className="form-control col-12" aria-describedby="helpId" onChange={(event) => this.setText(event)} placeholder="Search for..." />
                                <div className="btn btn-primary">Go</div>
                            </div>
                        </div>
                        {/* Sorting */}
                        <div className="product-sorting d-flex">
                            <div className="input-group sort-by-date d-flex align-items-center mr-15">
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">Sort by:</span>
                                </div>
                                <div>
                                    <select className="form-control">
                                        <option selected value="value">Date</option>
                                        <option value="value">Newest</option>
                                        <option value="value">Popular</option>
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