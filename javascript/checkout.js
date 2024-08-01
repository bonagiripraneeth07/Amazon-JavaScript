import { renderOrderSummery } from './checkout/orderSummery.js';
import { renderPaymentSummery } from './checkout/paymentSummery.js';
renderOrderSummery();
renderPaymentSummery();

//oops practice.... 
/*
class calculation {
    constructor() {
        console.log('this is constructtor');
    }
    add(num1, num2) {
        return num1 + num2;
    }
    sub(num1, num2) {
        return num2 - num1;
    };


};
class newclass extends calculation {

}
let cal = new calculation();
console.log(
    cal.add(1, 2),
    cal.sub(2, 1)
);
let cal2 = new newclass();
console.log(cal.add(5, 0));
*/