<template>
  <v-navigation-drawer>
    <v-list-item title="Biblioteca" class="cursor-pointer" @click="redirectIndex"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="Livros" @click="redirectBooks"></v-list-item>
    <v-list-item link title="Categorias" @click="redirectCategories"></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter();

const redirectBooks = () => {
  router.push({ name: "books" });
}

const redirectCategories = () => {
  router.push({ name: "categories" });
}

const redirectIndex = () => {
  router.push({ name: "home" });
}

</script>
