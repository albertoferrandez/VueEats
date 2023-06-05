import { reactive } from "vue"

const state = reactive({
  cart: [],
});

const methods = {

  addToCart(item) {
    const exist = state.cart.find(p => p.product.id === item.product.id)
    
    if (exist) {
        exist.amount++
    }else {
        state.cart.push(item)
    }
  },

  removeFromCart(id) {
    const index = state.cart.findIndex(item => item.product.id === id);

    if (index !== -1 && id !== undefined) {
      state.cart.splice(index, 1);
    }
  },

  incrementQuantity (id) {
    const index = state.cart.findIndex(item => item.product.id === id);

   state.cart[index].amount++

  },

  decrementQuantity (id) {
    const index = state.cart.findIndex(item => item.product.id === id);
    if (state.cart[index].amount > 1) {
        state.cart[index].amount--
    } else {
        this.removeFromCart(id)
    }
    
  }
}

export default {
  cart: state.cart,
  methods,
};
