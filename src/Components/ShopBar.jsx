import React, { Component } from 'react';

class ShopBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                        {/* Total Products */}
                        <div className="total-products">
                            <p>Showing 1-8 0f 25</p>
                        </div>
                        {/* Sorting */}
                        <div className="product-sorting d-flex">
                            <div className="sort-by-date d-flex align-items-center mr-15">
                                <p>Sort by</p>
                                <form action="#" method="get">
                                    <select name="select" id="sortBydate">
                                        <option value="value">Date</option>
                                        <option value="value">Newest</option>
                                        <option value="value">Popular</option>
                                    </select>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopBar;