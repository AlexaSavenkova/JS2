Vue.component('search', {
    data() {
        return {
            userSearch: '',
        }
    },
    template:  `<form class="topSearch">
                    <div>
                        Browse
                        <i class="fas fa-caret-down"></i>
                    </div>
                    <input type="text" v-model="userSearch" placeholder="Search for Item...">
                        <button type="submit" @click.prevent ="$root.$refs.products.filter(userSearch)">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`

});