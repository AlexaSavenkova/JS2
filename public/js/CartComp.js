Vue.component('cart', {
    props: ['visible','visibleMini'],
    data() {
        return {
            cartAPI: 'http://localhost:3000/api/cart/',
            // cartAPI: '/api/cart/',
            cartItems: [],
            img: "images/catalog/",
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

        addToCart(product) {
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

        clearAll() {
                // удаляем все
                this.$parent.deleteJson(this.cartAPI+'all')
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems = [];
                        }
                    });
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

    template: `
        <div>
        <div v-show="visible"> 
            <div class="cartBlock" v-if="!cartItems.length">
            <h2>Cart is empty</h2>
                <button class="cartBtn" @click="$root.hideCart()">CONTINUE SHOPPING</button>
            </div>
            <div v-else class="cartBlock">
    
                <div class="productsInCart">
                    <div class="productInCartRow">
                        <div class="productsInCartHeader">PRODUCT DETAILS</div>
                        <div class="productsInCartHeader">UNITE PRICE</div>
                        <div class="productsInCartHeader">QUANTITY</div>
                        <div class="productsInCartHeader">SHIPPING</div>
                        <div class="productsInCartHeader">SUBTOTAL</div>
                        <div class="productsInCartHeader">ACTION</div>
                    </div>
                    <div class="productInCartRow" v-for="item of cartItems" :key="item.id_product">
                        <div class="productInCartDescription">
                            <img :src="img+item.img" :alt="item.product_name">
                            <div class="productDetails">
                                <div class="productName">
                                    {{item.product_name}}
                                </div>
                                <div class="productSizeAndColor">
                                    Color:<span> Red</span>
                                    <br>
                                    Size:<span> Xll</span>
                                </div>
                            </div>
                        </div>
                        <div class="productInCartColumn">$ {{item.price.toFixed(2)}}</div>
                        <div class="productInCartColumn">
                            {{item.quantity}}
                        </div>
                        <div class="productInCartColumn">FREE</div>
                        <div class="productInCartColumn">$ {{(item.price*item.quantity).toFixed(2)}}</div>
                        <div class="productInCartColumn">
                            <button class="del-btn" @click="deleteItem(item)">
                              <i class="fas fa-times-circle"></i>
                            </button>
                            
                        </div>
                    </div>
                </div>
                <div class="cartButtons">
                    <button class="cartBtn" @click="clearAll()">CLEAR SHOPPING CART</button>
                    <button class="cartBtn" @click="$root.hideCart()">CONTINUE SHOPPING</button>
                </div>
                <div class="shipping">
                    <div class="shippingColumn">
                        <h2>SHIPPING ADRESS</h2>
                        <select>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>
                        <input type="text" placeholder="State">
                        <input type="text" placeholder="Postcode / Zip">
                        <button class="shippingBtn">GET A QUOTE</button>
                    </div>
                    <div class="shippingColumn">
                        <h2>COUPON DISCOUNT</h2>
                        <p>Enter your coupon code if you have one</p>
                        <input type="text" placeholder="State">
                        <button class="cupobBtn">APPLY COUPON</button>
                    </div>
                    <div class="checkout">
                        <div class="subTotal">SUB TOTAL <span>$ {{(this.cartTotal).toFixed(2)}}</span></div>
                        <div class="grandTotal">
                            GRAND TOTAL<span>$ {{(this.cartTotal).toFixed(2)}}</span></div>
                        <button class="checkoutBtn">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
        <mini-cart :cart-items = "cartItems" 
            :visible-mini = "visibleMini" 
            :img="img"
            :total ="this.cartTotal">
        </mini-cart>
         </div>
    `
});


Vue.component ('mini-cart', {
    props: ['cartItems', 'visibleMini','img','total'],
    template: `
    <div v-show="visibleMini" class ="mini-cart">
        <div v-if="!cartItems.length" class="miniCartBlock" >
            <h3>Your cart is empty</h3>
        </div>
        <div v-else class="miniCartBlock" >
        
            <div class="miniCartItem" v-for="item of cartItems" :key="item.id_product">
                            <div>
                                <img :src="img+item.img" :alt="item.product_name" width="80px">
                            </div>
                            <div class="miniCartInfo">
                                 <p>{{item.product_name}},  {{item.quantity}} unit(s)</p>
                                 <p>$ {{(item.price*item.quantity).toFixed(2)}}</p>
                            </div>
            </div>
            <h3>Total Price $ {{total.toFixed(2)}}</h3>
        </div>
            
    </div>
        
    `
});