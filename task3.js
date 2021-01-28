'use strict';

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    static sizesOptions = [
        {type: 'small', price: 50, calories: 20},
        {type: 'big', price: 100, calories: 40}
    ];

    static  stuffingOptions = [
        {type: 'cheese', price: 10, calories: 20},
        {type: 'salad', price: 20, calories: 5},
        {type: 'potato', price: 15, calories: 10}
    ];

    static toppingOptions = [
        {type: 'dressing', price: 15, calories: 0},
        {type: 'mayo', price: 20, calories: 5}
    ];

    addTopping(topping) {
        this.toppings.push(topping);
    }

    removeTopping(topping) {
        const i = this.toppings.findIndex((item) => item.type == topping.type);

         if (i !== -1) {
             this.toppings.splice(i, 1);
         }
    }

    getToppings() {
        return this.toppings;
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }

    calculatePrice() {
        const totalPrice = this.getSize().price +
            this.getStuffing().price +
            this.getToppings().reduce((sum, item) => sum += item.price, 0);
        console.log(`Price is ${totalPrice}`);
    }

    calculateCalories() {
        const totalCalories = this.getSize().calories +
            this.getStuffing().calories +
            this.getToppings().reduce((sum, item) => sum += item.calories, 0);
        console.log(`Contains ${totalCalories} calories`);
    }
}

const hamburger = new Hamburger(Hamburger.sizesOptions[0], Hamburger.stuffingOptions[0]);
hamburger.addTopping(Hamburger.toppingOptions[0]);
hamburger.addTopping(Hamburger.toppingOptions[1]);
hamburger.removeTopping(Hamburger.toppingOptions[1]);
console.log(hamburger);
hamburger.calculatePrice();
hamburger.calculateCalories();
