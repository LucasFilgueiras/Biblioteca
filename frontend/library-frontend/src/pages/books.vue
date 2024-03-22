<template>
  <SideMenu />
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="Criar">Criar</v-tab>
      <v-tab value="Listar">Listar</v-tab>
      <v-tab value="Reservar">Reservar</v-tab>
      <v-tab value="Devolver">Devolver</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Criar">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookName"
                    label="Título"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookAuthor"
                    label="Autor"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookPublicationYear"
                    label="Ano de publicação"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookDescription"
                    label="Descrição"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookCopies"
                    label="Cópias"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="bookAvailbleCopies"
                    label="Cópias disponíveis"
                    required
                  ></v-text-field>
                </v-col>

                <v-select
                  label="Categoria"
                  :items="categories"
                  item-title="name"
                  item-value="id"
                  v-model="selectedCategory"
                ></v-select>
              </v-row>
            </v-container>
          </v-form>

          <v-btn variant="outlined" @click="createBook">Criar</v-btn>
        </v-window-item>

        <v-window-item value="Listar">
          <div v-if="showEdit == true">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookNameEdit"
                      :counter="10"
                      label="Título"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookAuthorEdit"
                      :counter="10"
                      label="Autor"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookPublicationYearEdit"
                      label="Ano de publicação"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookDescriptionEdit"
                      label="Descrição"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookCopiesEdit"
                      label="Cópias"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="bookAvailbleCopiesEdit"
                      label="Cópias disponíveis"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-select
                    label="Categoria"
                    :items="categories"
                    item-title="name"
                    item-value="id"
                    v-model="selectedCategoryEdit"
                  ></v-select>
                </v-row>
              </v-container>
            </v-form>
            <v-btn @click="updateBook(bookId!)">Salvar</v-btn>
          </div>
          <div
            class="d-flex ga-5 align-center mt-3"
            v-for="(book, index) in books"
            :key="index"
          >
            <v-card class="pa-3">
              <strong>{{ book.title }}</strong><br>
              <small>{{ book.description }}</small><br>
              <small>{{ book.author }}</small>
            </v-card>
            <v-icon
              icon="$edit"
              class="cursor-pointer"
              @click="(showEdit = true), (bookId = book.id)"
            ></v-icon>
            <v-icon
              class="cursor-pointer"
              icon="mdi-delete"
              @click="deleteBook(book.id)"
            ></v-icon>
          </div>
        </v-window-item>

        <v-window-item value="Reservar">
          <div class="d-flex ga-5 align-center">
            <v-select
              label="Escolha o livro"
              :items="books"
              item-title="title"
              item-value="id"
              v-model="bookForReserve"
            ></v-select>
            <v-text-field
              v-model="reserveAmount"
              label="Quantidade"
              required
            ></v-text-field>
            <v-btn @click="reserveBook(bookForReserve)">Reservar</v-btn>
          </div>
        </v-window-item>

        <v-window-item value="Devolver">
          <div class="d-flex ga-5 align-center">
            <v-select
              label="Escolha o livro"
              :items="books"
              item-title="title"
              item-value="id"
              v-model="bookForGiveBack"
            ></v-select>
            <v-text-field
              v-model="giveBackAmount"
              label="Quantidade"
              required
            ></v-text-field>
            <v-btn @click="giveBackBook(bookForGiveBack)">Devolver</v-btn>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { IBook, ICategory } from "../interfaces";

const tab = ref("");
const bookName = ref("");
const bookDescription = ref("");
const bookAuthor = ref("");
const bookPublicationYear = ref();
const bookCopies = ref();
const bookAvailbleCopies = ref();

const bookNameEdit = ref("");
const bookDescriptionEdit = ref("");
const bookAuthorEdit = ref("");
const bookPublicationYearEdit = ref();
const bookCopiesEdit = ref();
const bookAvailbleCopiesEdit = ref();

const books = ref<IBook[]>([]);

const categories = ref<ICategory[]>([]);
const selectedCategory = ref();
const selectedCategoryEdit = ref();

const showEdit = ref(false);

const bookId = ref();

const bookForReserve = ref();
const reserveAmount = ref();

const bookForGiveBack = ref();
const giveBackAmount = ref();

const createBook = async () => {
  const date = new Date();

  if(bookName.value !== "" && bookAuthor.value !== "" && bookPublicationYear.value <= date.getFullYear() && bookAvailbleCopies.value <= bookCopies.value) {
    const createBook = await axios.post("http://localhost:3001/books", {
      title: bookName.value,
      description: bookDescription.value,
      author: bookAuthor.value,
      publicationYear: parseInt(bookPublicationYear.value),
      copies: parseInt(bookCopies.value),
      availbleCopies: parseInt(bookAvailbleCopies.value),
      categoryId: selectedCategory.value,
    });
    if (createBook.status == 201) window.alert("Livro cadastrado com sucesso!");
    return createBook;
  }
};

const deleteBook = async (id: number) => {
  const deleteBook = await axios.delete(`http://localhost:3001/books/${id}`);
  if(deleteBook.status == 200) window.alert("Livro excluído com sucesso!");
  return deleteBook;
};

const updateBook = async (id: number) => {
  const date = new Date();

  if(bookNameEdit.value !== "" && bookAuthorEdit.value !== "" && bookPublicationYearEdit.value <= date.getFullYear() && bookAvailbleCopiesEdit.value <= bookCopiesEdit.value) {
    const updateBook = await axios.patch(`http://localhost:3001/books/${id}`, {
      title: bookNameEdit.value,
      description: bookDescriptionEdit.value,
      author: bookAuthorEdit.value,
      publicationYear: parseInt(bookPublicationYearEdit.value),
      copies: parseInt(bookCopiesEdit.value),
      availbleCopies: parseInt(bookAvailbleCopiesEdit.value),
      categoryId: selectedCategoryEdit.value,
    });
    if(updateBook.status == 200) window.alert("Livro atualizado com sucesso!");
    return updateBook;
  }
};

const fetchAllCategories = async () => {
  const fetchAllCategories = await axios.get(
    "http://localhost:3001/categories"
  );
  categories.value = fetchAllCategories.data;
};

const fetchAllBooks = async () => {
  const fetchAllBooks = await axios.get("http://localhost:3001/books");
  books.value = fetchAllBooks.data;
};

const reserveBook = async (id: number) => {
  const reserveBook = await axios.patch(`http://localhost:3001/books/reserve/${id}`, {
    reserveAmount: parseInt(reserveAmount.value)
  })
  console.log(reserveBook)
  if (reserveBook.status == 200 && reserveBook.data !== "") window.alert("Livro reservado com sucesso!");
  return reserveBook;
}

const giveBackBook = async (id: number) => {
  const giveBackBook = await axios.patch(`http://localhost:3001/books/giveBack/${id}`, {
    giveBackAmount: parseInt(giveBackAmount.value)
  });
  if(giveBackBook.status == 200 && giveBackBook.data !== "") window.alert("Livro devolvido com sucesso!");
  return giveBackBook;
}

onMounted(fetchAllCategories);
onMounted(fetchAllBooks);
</script>
