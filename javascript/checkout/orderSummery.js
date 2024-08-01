import { product_cart, addToCart, removeFromCart, updateDeliveryOpition, displayCart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOpitions, getDeliveryOpition } from '../../data/deliveryOpitions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummery } from "./paymentSummery.js";
let cartchange = 0;

export function renderOrderSummery() {
  // console.log(`this is top chgange cart ${cartchange}`);
  let cartSummeryHTML = '';
  product_cart.forEach((cartItem) => {
    //console.log(cartItem.deliveryOpitionId);
    let cartItemId = cartItem.productId;
    let matchingItem = getProduct(cartItemId);
    //console.log(cartItem.quantity);
    //console.log(matchingItem);
    let deliveryOpitionId = cartItem.deliveryOpitionId;
    //console.log(deliveryOpitionId);
    let deliveryOpition = getDeliveryOpition(deliveryOpitionId);
    //console.log(`this is cartitem qunatity:${cartItem.quantity}`)
    const today = dayjs();
    const deliveryDate = today.add(deliveryOpition.deliveryDays, 'days');
    const dateString = deliveryDate.format('ddd, MMMM D');
    // let finalquantity = cartItem.quantity

    cartSummeryHTML +=
      `
 <div class="cart-item-container 
 js-cart-item-container-${matchingItem.id}">
<div class="delivery-date">
Delivery date: ${dateString}
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
      Quantity: <span   class="quantity-label js-change-quantity-${matchingItem.id}">${cartItem.quantity}</span>
    </span>
    <span class="update-quantity-link link-primary js-update" data-product-id="${matchingItem.id}">
      Update
    </span>
<select id="quantity-${matchingItem.id}" class='js-quantity'  style="display: none;"  >
        <option value="">--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
      Delete
    </span>
  </div>
</div>

<div class="delivery-options">
  <div class="delivery-options-title">
    Choose a delivery option:
  </div>
 ${deliveryOpitionsHTML(matchingItem, cartItem)}
</div>
</div>
 </div>
 `;
  }
  );


  function deliveryOpitionsHTML(matchingItem, cartItem) {

    let html = '';
    deliveryOpitions.forEach((deliveryOpition) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOpition.deliveryDays, 'days');
      const dateString = deliveryDate.format('ddd, MMMM D');

      //console.log(dateString);
      const priceString = deliveryOpition.price === 0
        ? 'FREE'
        : `$${(deliveryOpition.price / 100).toFixed(2)}-`;

      const isChecked = deliveryOpition.id === cartItem.deliveryOpitionId;
      //console.log(cartItem.deliveryOpitionId);


      html += ` <div class="delivery-option  js-delivery-opition"
    data-product-id="${matchingItem.id}"
    data-delivery-opition-id ="${deliveryOpition.id}">
    <input type="radio"
    ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="${matchingItem.id}">
      
    <div>
      <div class="delivery-option-date">
      ${dateString}
      </div>
      <div class="delivery-option-price">
         ${priceString}- Shipping
      </div>
    </div>
  </div> `

    });

    return html;


  }

  product_cart.forEach((cartItem) => {
    //console.log(cartItem.deliveryOpitionId);
    let cartItemId = cartItem.productId;
    let matchingItem = getProduct(cartItemId);
    //console.log(matchingItem);
    //console.log(`hello ${matchingItem.id}`);
    document.querySelector('.js-order-summery').innerHTML = cartSummeryHTML;

    document.querySelectorAll('.js-update').forEach((update) => {
      update.addEventListener('click', () => {
        console.log('clicked');
        let productId = update.dataset.productId;
        //console.log(productId);
        document.getElementById(`quantity-${productId}`).style.display = "block";
        // console.log(`js-change-quantity-${matchingItem.id}`);
        //console.log(document.getElementById(`quantity-${productId}`));

        document.getElementById(`quantity-${productId}`).onchange = function () {
          console.log(`clicked ${productId}`);
          cartchange = this.value;
          product_cart.forEach((cartItem) => {
            //console.log(cartItem.productId);
            if (productId === cartItem.productId) {
              cartItem.quantity = cartchange;
            }
          });
          //let matchingItem = getProduct(productId);
          //console.log(matchingItem);
          renderOrderSummery();
          renderPaymentSummery();
        }
      })
    })
  });

  /*
    document.querySelectorAll('.js-quantity').forEach((item) => {
      item.addEventListener('click', () => {
        console.log(item.value);
  
      })
    });
  */
  /** */



  /** */
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        removeFromCart(productId);

        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderPaymentSummery();
      });
    });
  let cartItems = displayCart();
  document.querySelector('.js-cartItems-checkout').innerHTML = `Checkout(${cartItems})`;
  document.querySelectorAll('.js-delivery-opition')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOpitionId } = element.dataset;
        updateDeliveryOpition(productId, deliveryOpitionId);
        renderOrderSummery();
        renderPaymentSummery();

      });
    });





}



