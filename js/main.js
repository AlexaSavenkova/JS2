
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const placeholder = 'images/placeholder200x150.jpeg';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// }

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
    });

}

// ------------------------------------------------

class ProductList {
    constructor(cart, container = '.products') {
        this.cart = cart;
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._fetchGoods();
    }

    _fetchGoods() {
        getRequest(`${API}catalogData.json`).
            then((data) => {
                this._goods = JSON.parse(data);
                this._render();
                this._addEventHandlers();
            })
            .catch((error) => console.log(error));
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _addEventHandlers() {
        const buyBtns = document.querySelectorAll('.buy-btn');
        buyBtns.forEach((btn)=> {
            btn.addEventListener('click', (event) => {
                cart.addItem(this.getProductById(+event.target.dataset.id_product));
            });
        });
    }

    getProductById(id){
        return this._allProducts.find(product => product.id_product === id);
    }
}


class ProductItem {
    constructor(product) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = product.img || placeholder;
    }

    render() {
        return `<div class="product-item">
              <img src="${this.img}" alt="${this.product_name}">
              <div class="product-info">
                  <h3>${this.product_name}</h3>
                  <p>${this.price.toLocaleString('ru-RU')} \u20bd</p>
                  <button class="buy-btn" data-id_product="${this.id_product}">Add to Cart</button>
              </div>
          </div>`;
    }
}


// класс элемента корзины такой же как элемент каталога , только добавляем количество


class CartItem extends ProductItem{
    constructor(product, img = placeholder, quantity = 1) {
        super(product, img);
        this.quantity = quantity;
    }
    _renderCartItem () {
        return `<div class="cart-item">
              <img src="${this.img}" alt="${this.product_name}">
              <div class="cart-product-info">
                  <h3>${this.product_name}</h3>
                  <p>${this.price.toLocaleString('ru-RU')} \u20bd</p>
                  <p>${this.quantity} unit(s)</p>
                  <button class="del-btn" data-id_product="${this.id_product}">Delete</button>
              </div>
          </div>`;
    }
}

class Cart {
    constructor(container = '.cartBlock') {
        this.container = container;
        this.cartProducts = []; // иассив экземрляров класса CartItem
        this._render();
        this._toggleCart();
    }
    _render() {
        const block = document.querySelector(this.container);
        block.innerHTML ='';
        if (this.cartProducts.length !== 0) {
            block.insertAdjacentHTML('beforeend', '<h3>Your cart</h3>');
        };
        for (let product of this.cartProducts) {
            block.insertAdjacentHTML('beforeend', product._renderCartItem());
        }

        const totalPrice = this.calculateTotalPrice();
        const totalPriceHTML = totalPrice ?
            `<h3 class="product-info"> Total price is ${totalPrice.toLocaleString('ru-RU')} \u20bd</h3>` :
            '<h3 class="product-info">Cart is empty</h3>';

        block.insertAdjacentHTML('beforeend', totalPriceHTML);

        this._addEventHandlers();
    }

    _addEventHandlers() {
        const delBtns = document.querySelectorAll('.del-btn');
        delBtns.forEach((btn)=> {
            btn.addEventListener('click', (event) => {
                this.deleteItem(this.getProductIndexById(+event.target.dataset.id_product));
            });
        });
    }

    _toggleCart() {
        const cartImg = document.querySelector('.cart');
        const cartBlock = document.querySelector(this.container);
        cartImg.addEventListener('click', (event) => {
            cartBlock.classList.toggle('hideCart');
        });
    }

    addItem(product) {
        const index = this.getProductIndexById(product.id_product);
        if ( index === -1){
            // создаем новый продукт
            const item = new CartItem(product);
            this.cartProducts.push(item);
        } else {
            // изменям количество
            this.cartProducts[index].quantity++;
        }
        this._render();

    }

    deleteItem(index){
        if ( index !== -1) {
            this.cartProducts.splice(index, 1);
            this._render();
        }
    }

    getProductIndexById(id){
        return this.cartProducts.findIndex(product => product.id_product === id);
    }


    calculateTotalPrice () {
        return this.cartProducts.reduce((sum, {price ,quantity}) => sum+= price * quantity, 0);
    }
}
const cart = new Cart();
const productList = new ProductList(cart);



