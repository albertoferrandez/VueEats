<template>
  <main class="mt-8 lg:mt-16 w-11/12 md:w-7/12 mx-auto grid lg:grid-cols-12 gap-8">
    <nav class="hidden lg:block col-span-3">
      <navbar :categories="categories" :selected-category="selectedCategory" filter-byrating="filterByRating"
    @update:selected-category="selectedCategory = $event"
    @update:filter-byrating="filterByRating = $event"/>
    </nav>
    
    <div class="block lg:hidden">
      <button type="button"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button" aria-expanded="true" aria-haspopup="true"
        @click="isOpen = !isOpen">
        Filtros
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <nav v-if="isOpen" class="lg:hidden absolute left-5 z-10 mt-12 w-56 origin-top-right rounded-md 
    bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <navbar :categories="categories" :selected-category="selectedCategory"
      @update:selected-category="selectedCategory = $event" />
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
            <div class="flex justify-between">
              <span class="text-gray-800 text-xs font-extrabold">{{ restaurant.rating / 10 * 100 }} %</span>
              <span class="text-gray-800 text-xs font-extrabold">{{ restaurant.time }} m</span>
            </div>
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
import Navbar from "../components/Navbar.vue"

let selectedCategory = ref("Restaurantes")
let isOpen = ref(false)
let filterByRating = ref(false)

const filteredRestaurants = computed(() => {
  let filteredData = data;

  if(selectedCategory === "Restaurantes") {
    return filteredData
  }

  if (selectedCategory.value !== "Restaurantes") {
    filteredData = filteredData.filter((restaurant) =>
      restaurant.categorias.includes(selectedCategory.value)
    );
  }

  if (filterByRating.value) {
    filteredData.sort((a, b) => b.rating - a.rating);
  }

  return filteredData;
});

</script>
