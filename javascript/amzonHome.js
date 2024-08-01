
import { product_cart, addToCart, displayCart } from '../data/cart.js';
import { imageSlider } from '../data/products.js';
import { products } from '../data/products.js ';
let cartItems = displayCart();
document.querySelector('.js-cart-quantity').innerHTML = cartItems;
let sliderHTML = '';
imageSlider.forEach((slide) => {
    sliderHTML += `
    <h1 class="section-heading" style="display: flex;justify-content: center;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" >${slide.heading}</h1>
<div class="slider1" style="border-radius: 5px;background-color: rgb(255, 255, 255);display: flex;justify-content: center; margin-top: 0px  " > 
   <img class="slider1-img-css" src=${slide.image1}  alt="">
  <img class="slider1-img-css" src=${slide.image2}  alt="">
  <img class="slider1-img-css" src=${slide.image3}   alt="">
  <img class="slider1-img-css" src=${slide.image4}   alt="">
  <img class="slider1-img-css" src= ${slide.image5}  alt="">
  <img class="slider1-img-css" src= ${slide.image6}  alt="">
  <img class="slider1-img-css" src=${slide.image7}  alt="">
  <img class="slider1-img-css" src=${slide.image8}    alt="">
  <img class="slider1-img-css" src= ${slide.image9}  alt="">
  <img class="slider1-img-css" src=${slide.image10}  alt="">
 
</div>
    
    `
});
document.querySelector('.section-Image-Slider').innerHTML = sliderHTML;