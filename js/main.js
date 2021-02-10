
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const placeholder = 'images/placeholder200x150.jpeg';

const app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: 'catalogData.json',
        isVisibleCart: false,
        products: [],
        cartItems: [],
        filtered: [],
        img: placeholder,
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addToCart(product) {
            // пока без обращения к серверу
            const item = this.cartItems.find(elem => elem.id_product === product.id_product);
            if (item){
                // изменям количество
                item.quantity++;
            } else {
                // создаем новый продукт
                const newItem = Object.assign({quantity: 1}, product);
                this.cartItems.push(newItem);
            }
        },

        deleteItem(item) {
            // пока без обращения к серверу
            if (item.quantity > 1) {
                // изменям количество
                item.quantity--;
            } else {
                // удаляем
                this.cartItems.splice(this.cartItems.indexOf(item),1);
            }
        },

        filter () {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(({product_name}) => regexp.test(product_name));
        },
    },

    computed: {
         cartTotal() {
                 return this.cartItems.reduce((sum, {price ,quantity}) => sum+= price * quantity, 0);
         },
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let elem of data) {
                    this.products.push(elem);
                    this.filtered.push(elem);
                }
            });
    }
});





