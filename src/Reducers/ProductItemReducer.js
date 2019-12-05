const ProductItemInitialState = {}
const ProductItem = (state = ProductItemInitialState, action) => {
    switch (action.type) {
        case "SET_PRODUCT_ITEM":
            return action.item
        default:
            return state
    }
}

export default ProductItem;