import React, { Component } from 'react';

class ProductBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-50">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Furniture</a></li>
                            <li className="breadcrumb-item"><a href="#">Chairs</a></li>
                            <li className="breadcrumb-item active" aria-current="page">white modern chair</li>
                        </ol>
                    </nav>
                </div>
            </div>
        );
    }
}

export default ProductBar;