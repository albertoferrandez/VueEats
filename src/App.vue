<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script setup>
  import Header from "./components/Header.vue"
  import Footer from "./components/Footer.vue"

  import store from "./store"
  import { provide } from "vue"

  provide("store", store)
</script>
<style></style>
