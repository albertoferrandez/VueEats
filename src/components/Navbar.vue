<template>
      <div class="flex flex-col gap-1 px-4">
        <h3 class="text-xs font-bold mb-4">Ordenar por</h3>
        <button @click.prevent="$emit('update:filter-byrating', true)"
        class="flex items-center gap-4 text-black font-normal text-xs mt-1">
          <img src="/assets/like.png" alt="" width="50" class="object-cover w-6 h-6" />
          Populares
        </button>
        <h3 class="text-xs font-bold mb-4 mt-4">Filtrar por</h3>
        <button v-for="category in categories" 
        @click.prevent="$emit('update:selected-category', category.text)"
          :class="`py-2 border-b border-slate-300 hover:border-slate-800 
            ${selectedCategory === category.text ? 'border-slate-800 text-font' : 'border-slate-300'}`">
          <div class="flex items-center gap-6">
            <img :src="category.image" alt="" width="50" class="object-cover w-6 h-6" />
            <h2 :class="`text-black text-xs mt-1 ${selectedCategory === category.text ? 'font-bold' : ' text-normal'}`">
              {{ category.text }}
            </h2>
          </div>
        </button>
      </div>
</template>
<script setup>
  const { categories, selectedCategory } = defineProps([
    'categories', 
    'selectedCategory', 
    'filterByRating'
  ])
</script>
