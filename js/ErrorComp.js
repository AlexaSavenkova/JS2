Vue.component ('error', {
    data() {
       return {
           text:'',
           isVisible: false,
       }
    },
    methods: {
        showErrorMsg(error) {
          this.text = error;
          this.isVisible = true;
        },

        closeErrorMsg() {
            this.isVisible = false;
        }
    },
    template:
        `<div class="errorBlock" v-if="isVisible">
            <p>{{text}} </p>
            <button @click= "closeErrorMsg()">Close</button>
        </div> `
});