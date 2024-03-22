<template>
  <SideMenu />
  <div class="d-flex ga-3 align-center mx-5 mt-5">
    <v-select
      label="Pesquisar por"
      :items="['Título', 'Autor', 'Categoria']"
      item-title="name"
      item-value="id"
      v-model="selectedSearch"
    ></v-select>
    <v-text-field
      v-model="inputSearch"
      label="Pesquise"
      required
    ></v-text-field>
    <v-btn @click="filterBooks">Pesquisar</v-btn>
  </div>
  <div class="mx-5" v-for="(book, index) in books" :key="index">
    <v-card
      class="pa-3 mt-2"
    >
      <strong>Título: {{ book.title }}</strong><br>
      <small>Descrição: {{ book.description }}</small><br>
      <small>Escrito por: {{ book.author }}</small><br>
      <small>Categoria: {{ book.category?.name }}</small><br>
      <small>Cópias disponíveis: {{ book.availbleCopies }}</small><br>
      <small>Cópias: {{ book.copies }}</small>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import { onMounted, ref } from "vue";
import { IBook } from "../interfaces";
import axios from "axios";

const selectedSearch = ref("");
const inputSearch = ref("");
const books = ref<IBook[]>([]);

const fetchAllBooks = async () => {
  const fetchAllBooks = await axios.get("http://localhost:3001/books");
  books.value = fetchAllBooks.data;
};

const filterBooks = async () => {
  if(selectedSearch.value == "Título") {
    const searchByTitle = await axios.post("http://localhost:3001/books/filterByTitle", {
      title: inputSearch.value
    })
    books.value = searchByTitle.data
  }

  if(selectedSearch.value == "Autor") {
    const searchByAuthor = await axios.post("http://localhost:3001/books/filterByAuthor", {
      author: inputSearch.value
    })
    books.value = searchByAuthor.data
  }

  if(selectedSearch.value == "Categoria") {
    const searchByCategory = await axios.post("http://localhost:3001/books/filterByCategory", {
      categoryName: inputSearch.value
    })
    books.value = searchByCategory.data
  }

  console.log(books.value)
}

onMounted(fetchAllBooks);
</script>
