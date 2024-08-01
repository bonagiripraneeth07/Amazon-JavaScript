/*let products = [{
    name: ' Black and Gray Athletic Cotton Socks - 6 Pairs',
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    rating: {
        stars: 4.5,
        count: 87
    },
    price: 1090
}, {
    name: 'Intermediate Size Basketball',
    image: 'images/products/intermediate-composite-basketball.jpg',
    rating: {
        stars: 4,
        count: 127
    },
    price: 2095
}, {
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    rating: {
        stars: 4.5,
        count: 56
    },
    price: 799
}];
*/
import { product_cart, addToCart, displayCart } from '../data/cart.js';
import { products } from '../data/products.js ';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderOrderSummery } from './checkout/orderSummery.js';
let today = dayjs();
let delivery = today.add(7, 'days');
console.log(delivery.format('dddd , MMMM D '));
let products_html = '';
products.forEach((product) => {
  products_html += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart"
           data-product-name="${product.name}"
           data-product-image="${product.image}"
           data-product-Id="${product.id}">
            Add to Cart
          </button>
          <div class='added-cart  js-added-to-cart'> </div>
        </div>
        
    `;
  ;
});
let cartItems = displayCart();
document.querySelector('.js-cart-quantity').innerHTML = cartItems;
function updateCartQuantiy() {
  let cart_quantity = 0;
  product_cart.forEach((cartItem) => {
    cart_quantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cart_quantity;
  console.log(cart_quantity);
  return cart_quantity;
}

document.querySelector('.js-product-grid').innerHTML += products_html;
document.querySelectorAll('.js-add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName;
    const productId = button.dataset.productId;
    //console.log(productId);
    addToCart(productId);
    updateCartQuantiy();
    //console.log(cart_quantity);
    //console.log(product_cart);
  });
});
