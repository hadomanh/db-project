import React, { Component } from 'react';
import ProductItem from './ProductItem';
import ShopBar from './ShopBar';
import Pagination from './Pagination';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    UNSAFE_componentWillMount()  {

        try {
            fetch(
                `http://localhost:5000`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            )
                .then(res => {
                    return res.json();
                })
                .then(result => {
                   
                    this.setState({
                        data: result.data.data.recordset
                    });
                })
        } catch (error) {
            window.alert(error.message);
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
                                return (<ProductItem name={x.name} price={x.price} star={x.name}/>);
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