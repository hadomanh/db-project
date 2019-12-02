import React, { Component } from 'react';
import ProductItem from './ProductItem';
import ShopBar from './ShopBar';
import Pagination from './Pagination';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5]
        }
    }

    render() {
        return (
            <div className="amado_product_area section-padding-100">
                <div className="container-fluid">
                    {/* first component */}
                    <ShopBar />

                    {/* second component */}
                    <div className="row">
                        {/* Single Product Area */}
                        {
                            this.state.data.map((x) => {
                                return (<ProductItem name="Tree" price={x} star={x}/>);
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

export default Shop;