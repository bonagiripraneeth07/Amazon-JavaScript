import { product_cart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { getDeliveryOpition } from "../data/deliveryOpitions.js";
import { removeFromCart2 } from "../data/cart.js";
//import { orderDate, orderTotal, run } from "./checkout/paymentSummery.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cartItems, orderPlacedDate } from "./checkout/paymentSummery.js";
import { displayCart } from "../data/cart.js";
let productPrice = 0;
let shippingPrice = 0;
let totalItems;
let date;
let orderTotal;

import { exportCart } from "../data/cart.js";
import { otherDetails } from "./checkout/paymentSummery.js";
otherDetails.forEach((item) => {
  // console.log(item.orderTotal);
  date = item.date;
  orderTotal = item.orderTotal

});
localStorage.removeItem('otherDetails');
setTimeout(() => {
  localStorage.removeItem('cart2');
  console.log('cleared');



}, 5000);

console.log(otherDetails)
let orderGridHTML = '';
let orderHTML = '';
removeFromCart2('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//console.log(product_cart);
/*
let deliveryOpitionId;
let deliveryOpition;
let dateString;

let product_Cart = JSON.parse(localStorage.getItem('cart'));
console.log(product_Cart)
let orderTotal;
let orderDate = JSON.parse(localStorage.getItem('date'));

console.log(orderDate);
product_cart.forEach((cartItem) => {
    console.log(cartItem.productId);
    let cartItemId = cartItem.productId;
    let matching = getProduct(cartItemId);
    deliveryOpitionId = cartItem.deliveryOpitionId;
    deliveryOpition = getDeliveryOpition(deliveryOpitionId);
    console.log(matching.quantity);
    console.log(cartItem.quantity)
    console.log(deliveryOpitionId)
    console.log(cartItem.quantity);
    totalItems++;
    let product = getProduct(cartItem.productId);
    // console.log(product);
    productPrice += product.priceCents * cartItem.quantity;
    let today = dayjs();
    const deliveryDate = today.add(deliveryOpition.deliveryDays, 'days');
    dateString = deliveryDate.format('ddd, MMMM D');
    //console.log(deliveryOpition.price);
    shippingPrice += deliveryOpition.price;
    console.log(dateString);
    // console.log(product);
    const totalBeforeTax = productPrice + shippingPrice;
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;
    orderTotal = (Math.round(total) / 100).toFixed(2);
    console.log(orderTotal);
    */

exportCart.forEach((item) => {
  console.log(item.quantity)
  let id = item.productId;
  if (id === 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6') {

  }
});

orderHTML += `
 
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${orderTotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div> 


`
exportCart.forEach((cartItem) => {
  let matching = getProduct(cartItem.productId);
  console.log(matching);
  let deliveryOpitionId = cartItem.deliveryOpitionId;
  let deliveryOpition = getDeliveryOpition(deliveryOpitionId);
  //console.log(matching.quantity);
  //console.log(cartItem.quantity)
  //console.log(deliveryOpitionId)
  //console.log(cartItem.quantity)
  let today = dayjs();
  const deliveryDate = today.add(deliveryOpition.deliveryDays, 'days');
  let dateString = deliveryDate.format('ddd, MMMM D');
  //console.log(dateString);
  orderGridHTML += `
 
            <div class="product-image-container">
              <img src=${matching.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matching.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="#">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

 
`

});
let HTML = '';
function pageReload() {
  HTML = `
 
          <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div> </div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div> </div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              
            </div> 

 
`
  document.querySelector('.order-header').innerHTML = HTML;

}





//console.log(orderTotal);
//console.log(orderPlacedDate);

//console.log(exportCart);
//console.log(otherDetails)

//console.log(date, orderTotal);
totalItems = displayCart();
console.log(exportCart.length)
if (exportCart.length === 0) {
  document.getElementById('cartEmpty').style.display = 'block';
  document.getElementById('main').style.display = 'none';

}

document.querySelector('.cart-quantity').innerHTML = totalItems;
document.querySelector('.order-header').innerHTML += orderHTML;
document.querySelector('.order-details-grid').innerHTML += orderGridHTML;

