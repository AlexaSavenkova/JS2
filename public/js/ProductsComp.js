Vue.component('products', {
    data() {
        return {
            catalogAPI: 'http://localhost:3000/api/products',
            // catalogAPI: '/api/products',
            products: [],
            filtered: [],
            img: "images/catalog/",
        }
    },

    methods: {
        filter (userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(({product_name}) => regexp.test(product_name));
        },
    },

    mounted() {
      this.$parent.getJson(this.catalogAPI)
          .then(data => {
              for (let elem of data) {
                    this.products.push(elem);
                    this.filtered.push(elem);
              }
          });
    },

    template: `
    <div class="featured">
            <div class="featuredHeaderTop">
                Featured Items
            </div>
            <div class="featuredHeaderBottom">
                Shop for items based on what we featured in this week
            </div>
            <div class="container products">
                <div class="featuredItem"  v-for="product of filtered" :key="product.id_product">
                    <div class="featuredHover">
                        <button @click="$root.$refs.cart.addToCart(product)">
                            <img src="images/addToCart.png" alt="">
                            Add to Cart
                        </button>
                    </div>
                    <img class="featuredPicture" :src="img+product.img" :alt="product.product_name">
                    <div class="featuredInfo">
                        <div class="featuredItemName">
                            {{product.product_name}}
                        </div>
                        <div class="featuredItemPrice">
                            $ {{product.price.toFixed(2)}}
                        </div>
                    </div>
                </div>
            </div>
            <h3 v-if="!filtered.length" class="product-info">No data</h3>
            <button v-else class="featuredBrowseAllBtn">
                Browse All Products
                <img src="images/arrow.png" alt="">
            </button>
        </div>
`
    // template: `<div class="products">
    //                 <div class="product-item" v-for="product of filtered" :key="product.id_product">
    //                     <img :src="img" :alt="product.product_name">
    //                     <div class="product-info">
    //                     <h3>{{product.product_name}}</h3>
    //                     <p>{{product.price.toLocaleString('ru-RU')}} ₽</p>
    //                     <button class="buy-btn" @click="$root.$refs.cart.addToCart(product)">Add to Cart</button>
    //                     </div>
    //                 </div>
    //                 <h3 v-if="!filtered.length" class="product-info">No data</h3>
    //              </div>`
});