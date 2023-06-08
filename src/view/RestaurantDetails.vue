<template>
    <main class="mt-16 w-11/12 md:w-8/12 mx-auto grid grid-cols-12 gap-8">
        <section class="col-span-12 lg:col-span-9">
            <div class="bg-white w-full rounded shadow-md p-4 flex justify-between">
                <h1 class="text-2xl font-bold">{{ nombre }}</h1>
                <button type="button"
                    class="lg:hidden inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                    id="menu-button" aria-expanded="true" aria-haspopup="true" @click="isOpen = !isOpen">
                    <img src="../assets/cart.png" alt="cart" width="20">
                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class="flex flex-column w-full mt-4">
                <input type="text" :placeholder="`Buscar en ${nombre}`"
                    class="rounded-lg bg-gray-100 shadow border-none w-full p-2 focus:outline-none placeholder:text-xs">
            </div>
            <div class="mt-8">
                <h2 class="font-bold text-md">Nuestros Productos</h2>

                <div id="filterBar" class="flex flex-row mx-auto my-4 text-xs text-slate-400">
                    <button v-for="category in uniqueTypes" @click.prevent="setFilterByCategory(category)"
                        class="px-4 py-2">
                        {{ category }}
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-2">
                    <transition-group name="fade" mode="out-in">
                        <div v-for="producto in filteredProductos" @click.prevent="getIntoCart(producto)"
                            :key="producto.name" class="overflow-hidden 
                                            rounded-md shadow transition delay-200 duration-200 
                                            ease-in-out hover:scale-105 cursor-pointer">
                            <div class="h-40 flex flex-col">
                                <div class="flex flex-row gap-4 h-3/4 px-2">
                                    <img :src="producto.imagen" alt="" class="rounded-md object-contain w-16">
                                    <div class="flex flex-col mt-2">
                                        <h3 class="text-sm">{{ producto.nombre }}</h3>
                                        <p class="text-xs text-gray-400">
                                            {{ producto.descripcion }}
                                        </p>
                                    </div>
                                </div>
                                <div class="h-1/4 flex justify-between items-center w-full px-4">
                                    <small>{{ producto.precio }} €</small>
                                    <small class="rounded-full bg-[#a894f9] bg-opacity-25 p-1">➕</small>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </section>

        <section class="col-span-3 hidden lg:block">
            <Cart />
        </section>

        <section v-if="isOpen" class="absolute right-5 z-10 mt-16 w-56 origin-top-right rounded-md">
            <Cart />
        </section>

    </main>
</template>
<script setup>
import { data } from "../assets/Restaurantes"
import { useRoute } from 'vue-router'
import { ref, computed, inject } from 'vue'
import Cart from '../components/Cart.vue'

let isOpen = ref(false)
const route = useRoute()
const items = data.filter(p => p.id == route.params.id)
const { productos, category, nombre } = items[0]

const types = productos.map(p => (
    p.tipo
))
const uniqueTypes = [...new Set(types)]
uniqueTypes.unshift('Todos')

const selectedCategory = ref('Todos')

const filteredProductos = computed(() => {
    if (selectedCategory.value === 'Todos') {
        return productos
    } else {
        return productos.filter(p => p.tipo === selectedCategory.value)
    }
})

const setFilterByCategory = (category) => {
    selectedCategory.value = category
}

const store = inject('store')

const getIntoCart = (product) => {
    store.methods.addToCart({
        product,
        amount: 1
    })
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>