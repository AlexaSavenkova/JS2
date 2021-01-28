'use strict';
const placeholder = 'images/placeholder200x150.jpeg';
class ProductList {
    // #goods;
    // #allProducts;
    // Safari не поддерживает приватные свойства и методы начинающиеся с  # 
    // поэтому я заменила  # на _ 

    constructor(container = '.products') {
        this.container = container;
        // this._goods = [];
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
    calcTotalPrice() {
        const totalPrice = this._allProducts.reduce((sum, item) => sum+= item.price, 0);
        const totalHTML = ` <h3 class="product-info"> Total price is ${totalPrice.toLocaleString('ru-RU')} \u20bd</h3>`;

        document.getElementsByTagName('main')[0].insertAdjacentHTML("beforeend", totalHTML);
    }
}


class ProductItem {
    constructor(product, img=placeholder) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="${this.title}">
              <div class="product-info">
                  <h3>${this.title}</h3>
                  <p>${this.price.toLocaleString('ru-RU')} \u20bd</p>
                  <button class="buy-btn">Add to Cart</button>
              </div>
          </div>`;
    }
}

const productList = new ProductList();
productList.calcTotalPrice();



// класс элемента корзины такой же как элемент каталога , только добавляем количество


class CartItem extends ProductItem{
    constructor(product, img = placeholder, quantity = 1) {
        super(product, img);
        this.quantity = quantity;
    }
    _render () {
        // отрисовка
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.cartProducts = []; // иассив экземрляров класса CartItem
        this._render();
    }
    _render() {
        // отрисовка
    }
    getProdacts() {
        return this.cartProducts;
    }
    addItem(item) {
        // добавить продукт
    }

    clearCart() {
        // очистить корзину
        this.cartProducts = [];
        this.render();
    }
    editCart() {
        // удалить часть товаров или изменить количество
    }

    calculateTotalPrice () {
        // рассчитать стоимость корзины
    }

    pay() {
        // оплатить покупки
    }

}
