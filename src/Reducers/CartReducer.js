const CartInitialState = [
    {
        id: "AAA",
        name: "Apple Watch Series 3",
        price: 299,
        quantity: 1
    },
    {
        id: "BBB",
        name: "AirPods 2",
        price: 249,
        quantity: 3
    },
    {
        id: "CCC",
        name: "MacBook Air",
        price: 2530,
        quantity: 2
    }
]
const Cart = (state = CartInitialState, action) => {

    switch (action.type) {
        case "ADD_CART_ITEM":
            var isExist = false;
            state.forEach((item) => {
                if (item.id === action.item.id) {
                    item.quantity += action.item.quantity;
                    isExist = true;
                }
            });

            if (!isExist) return [...state, action.item];
            else return state;

        case "CHANGE_QUANTITY":
            state.forEach((item) => {
                if (item.id === action.item.id) {
                    item.quantity = action.item.quantity;
                }
            });

            return state;

        default:
            return state
    }
}

export default Cart;