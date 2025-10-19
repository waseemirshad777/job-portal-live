<script setup>
import Footer from "@/components/WebLayout/Footer.vue";
import Navbar from "@/components/WebLayout/Nav.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <Navbar v-if="!route.meta.hideNavFooter" />

  <RouterView />

  <Footer v-if="!route.meta.hideNavFooter" />
</template>

<style scoped>

</style>
