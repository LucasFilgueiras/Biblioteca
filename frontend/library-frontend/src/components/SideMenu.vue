<template>
  <v-navigation-drawer>
    <router-link to="/" class="text-white"><v-list-item title="Biblioteca" class="cursor-pointer"></v-list-item></router-link>
    <v-divider></v-divider>
    <router-link to="/books" class="text-white"><v-list-item link title="Livros"></v-list-item></router-link>
    <router-link to="/categories" class="text-white"><v-list-item link title="Categorias"></v-list-item></router-link>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

</script>
