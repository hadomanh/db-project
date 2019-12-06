import React, { Component } from 'react';
import ProductItem from './ProductItem';
import ShopBar from './ShopBar';
import Pagination from './Pagination';
import { connect } from 'react-redux';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    render() {
        var result = [];
        this.props.productList.map((item) => {
            if (item.name.indexOf(this.state.search) !== -1) {
                result.push(item);
            }
        })

        return (
            <div className="amado_product_area section-padding-100">
                <div className="container-fluid">
                    {/* first component */}
                    <ShopBar searchFor={(data) => this.setState({ search: data })} />

                    {/* second component */}
                    <div className="row">
                        {
                            result.map((item) => {
                                return (<ProductItem item={item} />);
                            })
                        }

                    </div>

                    {/* third component */}
                    <Pagination />
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        productList: state.productList
    }
}

export default connect(mapStateToProps)(Shop);