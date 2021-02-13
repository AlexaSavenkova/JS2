Vue.component('products', {
    data() {
        return {
            catalogUrl: 'catalogData.json',
            products: [],
            filtered: [],
            img: placeholder,
        }
    },

    methods: {
        filter (userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(({product_name}) => regexp.test(product_name));
        },
    },

    mounted() {
      this.$parent.getJson(API+this.catalogUrl)
          .then(data => {
              for (let elem of data) {
                    this.products.push(elem);
                    this.filtered.push(elem);
              }
          });
    },

    template: `<div class="products">
                    <div class="product-item" v-for="product of filtered" :key="product.id_product">
                        <img :src="img" :alt="product.product_name">
                        <div class="product-info">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price.toLocaleString('ru-RU')}} ₽</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addToCart(product)">Add to Cart</button>
                        </div>
                    </div>
                    <h3 v-if="!filtered.length" class="product-info">No data</h3>
                 </div>`
});