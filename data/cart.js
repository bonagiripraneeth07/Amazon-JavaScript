
import { getProduct } from "./products.js";
export let product_cart = JSON.parse(localStorage.getItem('cart'));

//reset to zero will start cart size to zer0
//else onlick it will start from 3 and + 1;
if (!product_cart) {

    product_cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOpitionId: '1',
            estimatedDate: ''

        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOpitionId: '2',
            estimatedDate: ''
        }];

}
export let exportCart = JSON.parse(localStorage.getItem('cart2'));
if (!exportCart) {
    exportCart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOpitionId: '1',
        estimatedDate: ''
    }];

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(product_cart));
}
function saveToStorage2() {
    localStorage.setItem('cart2', JSON.stringify(exportCart));
}
export function addToCart(productId) {
    let matching;
    product_cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matching = cartItem;
        }
    });
    if (matching) {
        matching.quantity += 1;

    } else {
        product_cart.push({
            productId: productId,
            quantity: 1,
            deliveryOpitionId: '1',


        }
        );
    }
    saveToStorage();
}
export function exportingorder(productId) {
    let matching;
    exportCart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matching = cartItem;
        }
    });
    if (matching) {
        matching.quantity += 1;
    } else {
        exportCart.push({
            productId: productId,
            quantity: 1,

        });
    }
    saveToStorage2();
}

export function removeFromCart(productId) {
    let newCart = [];
    product_cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);

        }
    });
    product_cart = newCart;
    console.log(product_cart);
    saveToStorage();
}
export function removeFromCart2(productId) {
    let newCart = [];
    exportCart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);

        }
    });
    exportCart = newCart;
    //console.log(exportCart);
    saveToStorage();
}

export function updateDeliveryOpition(productId, deliveryOpitionId) {
    let matchingItem;
    product_cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOpitionId = deliveryOpitionId;
    saveToStorage();
}
export function displayCart() {
    let cartItems = 0;
    product_cart.forEach((cartItem) => {
        let product = getProduct(cartItem.productId);
        //console.log(product);
        cartItems++;
        // localStorage.setItem('totalCart', JSON.stringify(cartItem));
    });
    // console.log(cartItems);
    return cartItems;
};