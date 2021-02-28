
const app = new Vue ({
    el: '#app',
    data: {
        isVisibleCart: false,
        isVisibleMiniCart: false,
    },

    methods: {

        showCart() {
            this.isVisibleCart = true;
            this.isVisibleMiniCart = false;
        },

        hideCart() {
            this.isVisibleCart = false;
        },

        showMiniCart() {
            if(!this.isVisibleCart) {
                this.isVisibleMiniCart = true;
            }
        },

        hideMiniCart() {
            this.isVisibleMiniCart = false;
        },

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.error.showErrorMsg(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.showErrorMsg(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.showErrorMsg(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.showErrorMsg(error);
                });
        },

    },

    mounted() {
        console.log(this);
    }
});





