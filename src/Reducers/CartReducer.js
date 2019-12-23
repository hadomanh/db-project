import x from '../frontend/CartInitial'
// const CartInitialState = [
//     {
//         id: "AAA",
//         name: "Apple Watch Series 3",
//         price: 299,
//         quantity: 1
//     },
//     {
//         id: "BBB",
//         name: "AirPods 2",
//         price: 249,
//         quantity: 3
//     },
//     {
//         id: "CCC",
//         name: "MacBook Air",
//         price: 2530,
//         quantity: 2
//     }
// ]  

const Cart = (state = x.then(data => {
    return data;
}), action) => {

    switch (action.type) {
        case "ADD_CART_ITEM":
            var isExist = false;
            console.log('state vkl ne',state);
            
            // state.forEach((item) => {
            //     if (item.productID === action.item.productID) {
            //         item.quantity += action.item.quantity;
            //         isExist = true;
            //     }
            // });

            // if (!isExist) return [...state, action.item];
            // else
             return state;

        case "CHANGE_QUANTITY":
            state = x.then(data => {
                console.log("reducer ne: ",data);
                data.forEach((item) => {
                    if (item.productID === action.item.productID) {
                        item.quantity = action.item.quantity;
                    }
                });
                return data;
            })

            return state;

        default:
            return state
    }
}

export default Cart;