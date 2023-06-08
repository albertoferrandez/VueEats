<template>
    <section class="col-span-3 hidden md:block">
        <div class="sticky bg-white w-full rounded shadow-md min-h-[450px]">
            <h1 class="font-bold text-center py-4 border-b border-b-purple-400">Tu pedido</h1>
            <div class="flex flex-col mt-4">
                <div v-if="itemsInCart.length === 0">
                    <p class="text-center text-sm mx-4 text-gray-400">
                        Todavía no has añadido ningún producto. Cuando lo hagas, ¡verás los productos aquí!
                    </p>
                </div>
                <div v-for="items in itemsInCart" :key="items.product.nombre"
                    class="flex flex-col w-full px-3  overflow-y-auto">
                    <div class="flex justify-between items-center">
                        <h2 class="text-sm text-gray-900 p-4">{{ items.product.nombre }}</h2>
                        <div class="flex items-center">
                            <span class="text-xs font-bold">{{ items.product.precio }} €</span>
                        </div>
                    </div>
                    <div class="flex justify-between sm:mt-0 text-xs">
                        <div class="flex items-center border-gray-100">
                            <span @click.prevent="decrementQuantity(items.product.id)" class="cursor-pointer rounded-l bg-gray-100 
                                      py-1 px-3.5 duration-100 hover:bg-[#a894f9] hover:text-blue-50">
                                -
                            </span>
                            <div class="py-1 px-3.5 border bg-white flex items-center outline-none">
                                {{ items.amount }}
                            </div>
                            <span @click.prevent="incrementQuantity(items.product.id)" class="cursor-pointer rounded-r bg-gray-100 py-1 
                                      px-3 duration-100 hover:bg-[#a894f9] hover:text-blue-50">
                                +
                            </span>
                        </div>
                        <div>
                            <img src="/trash.svg" alt="trash icon" width="30" class="cursor-pointer"
                                @click="removeFromCart(items.product.id)">
                        </div>
                    </div>
                </div>
            </div>

            <button v-disabled="itemsInCart.length === 0" class="bg-[#a894f9] text-white absolute bottom-0 
                        font-bold py-4 px-4 rounded-md text-sm w-full">
                <div>
                    Realizar Pedido
                    <span v-if="totalCart > 0">{{ totalCart.toFixed(2) }} €</span>
                </div>
            </button>
        </div>
    </section>
</template>

<script setup>
import { inject, computed } from 'vue'

const store = inject('store')

const itemsInCart = store.cart

const removeFromCart = (id) => {
    console.log(id)
    store.methods.removeFromCart(id)
}

const incrementQuantity = (id) => {
    store.methods.incrementQuantity(id)
}

const decrementQuantity = (id) => {
    store.methods.decrementQuantity(id)
}

const totalCart = computed(() => {
    return itemsInCart.reduce((acc, item) => {
        return Number(acc += item.amount * item.product.precio)
    }, 0)
})

</script>
