<template>
    <main class="mt-16 w-11/12 md:w-8/12 mx-auto grid grid-cols-12 gap-8">
        <section class="col-span-12 lg:col-span-9">
            <div class="bg-white w-full rounded shadow-md p-4">
                <h1 class="text-2xl font-bold">{{ nombre }}</h1>
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

        <Cart />
    </main>
</template>
<script setup>
    import { data } from "../assets/Restaurantes"
    import { useRoute } from 'vue-router'
    import { ref, computed, inject } from 'vue'
    import Cart from '../components/Cart.vue'

    const route = useRoute()
    const items = data.filter(p => p.id == route.params.id)
    const {productos, category, nombre} = items[0]
    
    const types = productos.map(p => (
        p.tipo
    ))
    const uniqueTypes = [...new Set(types)]
    uniqueTypes.unshift('Todos')

    const selectedCategory = ref('Todos')
    const active = ref(true)

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