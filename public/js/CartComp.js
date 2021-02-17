Vue.component('cart', {

    data() {
        return {
            cartAPI: '/api/cart/',
            isVisibleCart: false,
            cartItems: [],
            img: placeholder,
        }
    },

    computed: {
        cartTotal() {
            return this.cartItems.reduce((sum, {price ,quantity}) => sum+= price * quantity, 0);
        },
        cartQuantity() {
            return this.cartItems.length;
        }
    },

    methods: {
        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        addToCart(product) {
            // пока без обращения к серверу
            const item = this.cartItems.find(elem => elem.id_product === product.id_product);
            if (item){
                // изменям количество
                this.$parent.putJson(this.cartAPI+item.id_product, {quantity: 1});
                item.quantity++;
            } else {
                // создаем новый продукт
                const newItem = Object.assign({quantity: 1}, product);
                this.$parent.postJson(this.cartAPI, newItem)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(newItem);
                        }
                    });
            }
        },

        deleteItem(item) {
            if (item.quantity > 1) {
                // изменям количество
                this.$parent.putJson(this.cartAPI+item.id_product, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                // удаляем
                this.$parent.deleteJson(this.cartAPI+item.id_product)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },

    mounted() {
        this.$parent.getJson(this.cartAPI)
            .then(data => {
                for (let elem of data.contents){
                    this.cartItems.push(elem);
                }
            });
    },

    template: `<div class="cartBlock container" v-show="isVisibleCart">
                   <div class="cart-item" v-for="item of cartItems" :key="item.id_product">
                       <img :src="img" :alt="item.product_name">
                      <div class="cart-product-info">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.price.toLocaleString(\'ru-RU\')}} ₽ for unit</p>
                            <p>{{item.quantity}} unit(s)</p>
                            <button class="del-btn" @click="deleteItem(item)">Delete</button>
                        </div>
                    </div>
                    <h3 v-if="!cartItems.length" class="product-info">Cart is empty</h3>
                    <h3 v-else class="product-info">Total price is {{cartTotal.toLocaleString(\'ru-RU\')}} ₽</h3>
                </div>`
});