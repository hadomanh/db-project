import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from "../Store/Store";

class CartTotal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            data: []
        }
    }

    componentDidMount() {
        this.props.cart.then(data => {
            this.setState({
                data: data
            });
           
        })
        .then(()=>{this.props.cart.then(data => {
            console.log('data carttotal',data);
            if(data){data.forEach(item => {
                // total += item.price * item.quantity;
                var total=this.state.total;
                this.setState({
                    total: total +item.price*item.quantity
                });
            });}
            else{
                console.log('hay dang nhap');
            }
        }
        );})
        
        

    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    // componentDidMount() {
    //     this.props.cart.then((data)=>{
    //         this.setState({
    //             data: data
    //         })
    //     });
    // }


    // getTotal = () =>{
    //     var total = 0;
    //     this.state.data.map((item)=>{
    //         total += item.price * item.quantity;
    //     })
    //     return total;
    // }

    // getTotal = () => {
    //     // var total = 0;
    //     this.props.cart.then(data => {
    //         data.forEach(item => {
    //             // total += item.price * item.quantity;
    //             this.setState({
    //                 total: this.state.total +item.price*item.quantity
    //             })
    //         });
          
    //     }
    //     );

    render() {

        Store.subscribe(() => {
            this.setState({
                total:0
            })
          {
                
            this.props.cart.then(data => {
                var total=0;
                data.forEach(item => {
                    
                    
                    total += item.price * item.quantity;
                 console.log(total);   
                });
              this.setState({
                  total:total
              });
              console.log('vkl',this.state.total);
            }
            );
          }

           

        });

        return (
            <div className="col-12 col-lg-4">
                <div className="cart-summary">
                    <h5>Cart Total</h5>
                    <ul className="summary-table">
                        <li><span>subtotal:</span> <span>${this.state.total}</span></li>
                        <li><span>delivery:</span> <span>$30</span></li>
                        <li><span>total:</span> <span>${this.state.total + 30}</span></li>
                    </ul>


                    {(
                        () => {
                            if (!this.props.checkout)
                                return (
                                    <div className="cart-btn mt-100" onClick={this.props.checkoutBtn}>
                                        <a className="btn amado-btn w-100">Checkout</a>
                                    </div>
                                )
                        }
                    )()}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        checkout: state.checkout
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkoutBtn: () => {
            dispatch({type: "CHECKOUT_BTN_CLICK"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTotal)