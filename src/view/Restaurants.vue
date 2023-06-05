<template>
  <main class="mt-16 w-11/12 md:w-7/12 mx-auto grid grid-cols-12 gap-8">
    <nav class="hidden md:block col-span-3">
      <div class="flex flex-col gap-1 px-4">
        <h3 class="text-xs font-bold mb-4">Ordenar por</h3>
        <button class="flex items-center gap-6 text-black font-normal text-xs mt-1">
          <img src="../assets/like.png" alt="" width="50" class="object-cover w-6 h-6" />
          Mas Populares
        </button>
        <h3 class="text-xs font-bold mb-4 mt-4">Filtrar por</h3>
        <button v-for="category in categories" 
        @click.prevent="selectedCategory = category.text"
          class="py-2 border-b border-slate-300">
          <div class="flex items-center gap-6">
            <img :src="category.image" alt="" width="50" class="object-cover w-6 h-6" />
            <h2 class="text-black font-normal text-xs mt-1">
              {{ category.text }}
            </h2>
          </div>
        </button>
      </div>
    </nav>

    <section class="col-span-12 md:col-span-9">
      <div class="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <router-link v-for="restaurant in filteredRestaurants"
          :to="{ name: 'RestaurantDetail', params: { id: restaurant.id } }" :key="restaurant.id"
          class="relative overflow-hidden rounded-md shadow">
          <div class="h-40 bg-cover bg-center hover:scale-125 transition-all duration-500 cursor-pointer overflow-hidden"
            :style="`background-image: url('${restaurant.logo}');`">
            <div class="absolute w-full h-full bg-black bg-opacity-30 rounded-md"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <p class="text-white text-2xl font-bold">{{ restaurant.nombre }}</p>
              <div class="flex gap-2">
                <span v-for="category in restaurant.categorias"
                  class="text-xs bg-black bg-opacity-30 px-2 rounded text-white font-bold">
                  {{ category }}
                </span>
              </div>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-white p-2">
            <p class="text-gray-800 text-xs font-extrabold">{{ restaurant.rating / 10 * 100 }}%</p>
          </div>
        </router-link>
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed, ref } from "vue"
import { categories } from "../assets/Categories"
import { data } from "../assets/Restaurantes"

let selectedCategory = ref("")

const filteredRestaurants = computed(() => {
  if (!selectedCategory.value) {
    return data
  } else {
    return data.filter((restaurant) =>
      restaurant.categorias.includes(selectedCategory.value)
    )
  }
})

</script>
