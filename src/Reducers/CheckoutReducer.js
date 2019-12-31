const CheckoutInitialState = false
const Checkout = (state = CheckoutInitialState, action) => {
    switch (action.type) {
        case "CHECKOUT_BTN_CLICK":
            return !state
        default:
            return state
    }
}

export default Checkout;