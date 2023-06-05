<template>
    <header class="flex items-center justify-between p-8 sticky bg-emerald-300">
      <div class="flex flex-grow basis-0">
        <router-link to="/" class="flex gap-2 items-center">
          <h1 class="font-bold text-2xl text-white">Eats</h1>
          <img src="/icon.png" alt="" width="35" />
        </router-link>
      </div>
      <div>
        <input
          type="text"
          class="rounded-full bg-slate-100 p-2 text-sm w-80"
          placeholder="Buscar . . ."
        />
      </div>

      <div class="flex flex-grow justify-end">
        <div class="bg-[#a894f9] text-white font-bold py-1 px-6 rounded-md inline-flex items-center gap-2">
          <img src="/user.png" alt="" width="20" />
          Usuario
        </div>
      </div>
    </header>
</template>

<script setup>
</script>
