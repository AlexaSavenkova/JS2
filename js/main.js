
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const placeholder = 'images/placeholder200x150.jpeg';

const app = new Vue ({
    el: '#app',

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.error.showErrorMsg(error);

                })
        },
    },

    mounted() {
        console.log(this);
    }
});





