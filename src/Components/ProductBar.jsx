import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-50">
                            <li className="breadcrumb-item"><a>Home</a></li>
                            <li className="breadcrumb-item"><a>Product</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{this.props.productItem.name}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        productItem: state.productItem
    }
}

export default connect(mapStateToProps)(ProductBar)