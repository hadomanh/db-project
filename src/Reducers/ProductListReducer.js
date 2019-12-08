// var x=[];

import x from "../frontend/ProductInitial"

// try {
//     fetch(
//         `http://localhost:5000`,
//         {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include'
//         }
//     )
//         .then(res => {
//             return res.json();
//         })
//         .then(result => {
//             x = result.data.data.recordset
//         })
// } catch (error) {
//     window.alert(error.message);
// }

// const ProductListInitialState = function (x) {
//     try {
//        var x =fetch(
//             `http://localhost:5000`,
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials: 'include'
//             }
//         )
//             .then(res => {
//                 return res.json();
//             })
//             .then(result => {
                
//                 return result.data.data.recordset;
//             })
//     } catch (error) {
//         window.alert(error.message);
//     }
//     return x;
// }


// const ProductListInitialState = [
//     {
//         id: "1",
//         name: "Mac Pro 2019",
//         price: 999,
//         star: 5,
//         description: "With the latest Intel Core processors, MacBook Pro reaches new heights in compute performance. The 15‑inch model now features a ninth-generation 8-core Intel Core i9 processor that reaches Turbo Boost speeds up to 5.0GHz. This gives 3D graphics apps like Autodesk Maya up to 40 percent faster render speeds compared with the previous-generation 6-core processor and up to 2x faster render speeds than a quad-core processor.2 And a new eighth-generation quad‑core processor on the 13‑inch MacBook Pro makes it ready to take on even the toughest tasks. So when you’re powering through pro‑level processing jobs like compiling code, rendering 3D models, adding special effects, layering multiple tracks, or encoding video, you’ll get everything done. Faster."
//     },
//     {
//         id: "2",
//         name: "iPhone 11",
//         price: 150,
//         star: 3,
//         description: "The iPhone 11, along with the iPhone 11 Pro, has Apple's A13 Bionic processor with a third-generation neural engine. It has three internal storage options: 64 GB, 128 GB, and 256GB."
//     },
//     {
//         id: "3",
//         name: "Apple Watch Series 5",
//         price: 620,
//         star: 4,
//         description: "You’ve never seen a watch like this."
//     }
// ]
x.then(data => {
    console.log('data ne',data);
    return data;
})

// const ProductList = (state = ProductListInitialState, action) => {
//     switch (action.type) {
//         case "SET_PRODUCT_LIST":
//             return state
//         default:
//             return state
//     }
// }

const ProductList = (state = x.then(data => {
    console.log('data ne',data);
    return data;
}), action) => {
    switch (action.type) {
        case "SET_PRODUCT_LIST":
            return state
        default:
            return state
    }
}
export default ProductList;