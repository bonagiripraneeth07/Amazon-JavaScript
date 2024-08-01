import { product_cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOpition } from "../../data/deliveryOpitions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { removeFromCart } from "../../data/cart.js";
export let cartItems = [];
import { exportingorder, exportCart, removeFromCart2 } from "../../data/cart.js";

export let orderTotal;
export let orderPlacedDate = 12;
let today = dayjs();
let date = today.format("ddd ,MMMM DD");
export let otherDetails = JSON.parse(localStorage.getItem('otherDetails'));
if (!otherDetails) {
  otherDetails = [{
    date: '',
    orderTotal: ''
  }
  ];
}
export function renderPaymentSummery() {
  document.getElementById("cartEmpty").style.display = "none"
  let productPrice = 0;
  let shippingPrice = 0;
  let totalItems = 0;
  if (product_cart.length === 0) {
    document.getElementById('main').style.display = "none";
    document.getElementById("cartEmpty").style.display = "block"

  }
  product_cart.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    // console.log(product);
    productPrice += product.priceCents * cartItem.quantity;
    let deliveryOpition = getDeliveryOpition(cartItem.deliveryOpitionId);
    //console.log(deliveryOpition.price);
    shippingPrice += deliveryOpition.price;
    totalItems++;
  });
  //console.log(productPrice);
  // console.log(shippingPrice);
  const totalBeforeTax = productPrice + shippingPrice;
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;
  orderTotal = (Math.round(total) / 100).toFixed(2);
  let paymentSummeryHTML =
    `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${(Math.round(productPrice) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(shippingPrice) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(Math.round(totalBeforeTax) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(tax) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(Math.round(total) / 100).toFixed(2)}</div>
          </div>

          <button id='js-placeOrder' class="place-order-button button-primary">
            Place your order
          </button>


    `;
  //here starts confirm page 
  let dateString;
  let matchingItem;
  let confirmOrderHTML;
  let confirmOrderpaymentHTML;
  let today = dayjs();
  orderTotal = (Math.round(total) / 100).toFixed(2);
  console.log(orderTotal);
  let orderDate = (today.format('ddd MMMM D'));
  //console.log(otherDetails);
  product_cart.forEach((cartItem) => {
    //cartItems.push(cartItem);
    //  console.log(cartItems);
    //console.log(cartItem.deliveryOpitionId);
    let cartItemId = cartItem.productId;
    matchingItem = getProduct(cartItemId);
    //console.log(cartItem.quantity);
    //console.log(matchingItem);
    let deliveryOpitionId = cartItem.deliveryOpitionId;
    //console.log(deliveryOpitionId);
    let deliveryOpition = getDeliveryOpition(deliveryOpitionId);
    //console.log(`this is cartitem qunatity:${cartItem.quantity}`)
    const today = dayjs();
    const deliveryDate = today.add(deliveryOpition.deliveryDays, 'days');
    dateString = deliveryDate.format('ddd, MMMM D');
    cartItems.push(cartItem,);
    cartItem.estimatedDate = dateString;
    //console.log(cartItems);

    confirmOrderHTML += `
           <div class="cart-item-container">
             <div class="delivery-date">
              Estimated Delivery Date:${dateString} 
             </div>
    
             <div class="cart-item-details-grid">
               <img class="product-image"
                 src="${matchingItem.image}">
    
               <div class="cart-item-details">
                 <div class="product-name">
                   ${matchingItem.name}
                 </div>
                 <div class="product-price">
                    $${(matchingItem.priceCents / 100).toFixed(2)}
                 </div>
                 <div class="product-quantity">
                   <span>
                     Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                   </span>
                   
                 </div>
               </div>
               </div>
             </div>
 `;
  });
  confirmOrderpaymentHTML += `
  <div class="payment-summary-title ">
     Order Summary
   </div>
   <div class="payment-summary-row">
     <div>Items (${totalItems}):</div>
     <div class="payment-summary-money">$${(Math.round(productPrice) / 100).toFixed(2)}</div>
   </div>
     
   <div class="payment-summary-row total-row">
     <div>Order total:</div>
     <div class="payment-summary-money">$${(Math.round(total) / 100).toFixed(2)} </div>
   </div>
   <button class="place-order-button button-primary confirm-order-button">
     Confirm Order
   </button>
            `
  document.querySelector('.js-paymentSummery').innerHTML = paymentSummeryHTML;
  document.querySelector('.place-order-button').addEventListener('click', () => {
    console.log('clicked')

    //console.log(otherDetails)
    document.querySelector('.cart-items-confirm').innerHTML = confirmOrderHTML;
    document.querySelector('.order-summery-confirm').innerHTML = confirmOrderpaymentHTML;
    document.getElementById('confirmOrder').style.display = "block";
    //document.getElementById('close-confirmOrder').style.display = "block";/.
    document.getElementById('overlay').style.display = "block";
    document.querySelector('.confirm-order-button').addEventListener(
      'click', () => {
        document.getElementById("confirm-img").style.display = "block"
        console.log("oder placed");
        localStorage.removeItem('cart2');
        orderPlacedDate = 15;
        console.log(orderPlacedDate);
        otherDetails.push({
          date: orderDate,
          orderTotal: orderTotal
        });
        otherDetails.forEach((item) => {
          console.log(item.orderTotal);
        });
        save();
        //orderSuccessful();
        product_cart.forEach((item) => {
          let product = getProduct(item.productId);
          exportingorder(product.id);
          removeFromCart(product.id);

          setTimeout(cleardisplay, 3000);
          function cleardisplay() {
            alert(`Your  Order with  Id : 27cba69d-4c3d-4098-b42d-ac7fa62b7664 is confirmed   `);
            if (product_cart.length === 0) {
              document.getElementById('main').style.display = "none";
              document.getElementById("cartEmpty").style.display = "block"

            }
          }
        });


      }
    );
  });
  document.querySelector('.close-confirmOrder').addEventListener('click', () => {
    document.getElementById('confirmOrder').style.display = "none";
    document.getElementById('overlay').style.display = "none";
  })
}
function orderSuccessful() {
  document.getElementById('main').style.display = "none";
  document.getElementById("cartEmpty").style.display = "block"
}
function save() {

  localStorage.setItem('otherDetails', JSON.stringify(otherDetails));
}
//let dd = (cartexport("15b6fc6f-327a-4ec4-896f-486349e85a3d"));
//console.log(dd);




localStorage.removeItem('exoportCart');
removeFromCart2('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');