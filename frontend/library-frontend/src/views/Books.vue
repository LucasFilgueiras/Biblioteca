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
          <v-form @submit.prevent="createBook">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.title"
                    label="Título"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.author"
                    label="Autor"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.publicationYear"
                    label="Ano de publicação"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.description"
                    label="Descrição"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.copies"
                    label="Cópias"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="registerBook.availbleCopies"
                    label="Cópias disponíveis"
                    type="number"
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

            <v-btn variant="outlined" type="submit">Criar</v-btn>
          </v-form>

        </v-window-item>

        <v-window-item value="Listar">
          <div v-if="showEdit == true">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.title"
                      label="Título"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.author"
                      label="Autor"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.publicationYear"
                      label="Ano de publicação"
                      type="number"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.description"
                      label="Descrição"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.copies"
                      label="Cópias"
                      type="number"
                      hide-details
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="editBook.availbleCopies"
                      label="Cópias disponíveis"
                      type="number"
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
            :key="book.id"
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

  <Modal 
    message="Livro cadastrado com sucesso!"
    title="Livro cadastrado"
    :isActive="activeModal"
  />
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import Modal from "../components/Modal.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import type { IBook, ICategory } from "../interfaces";

const tab = ref("");
const registerBook = ref({
  title: "",
  description: "",
  author: "",
  publicationYear: "",
  copies: "",
  availbleCopies: ""
})
const editBook = ref({
  title: "",
  description: "",
  author: "",
  publicationYear: "",
  copies: "",
  availbleCopies: ""
})

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

const activeModal = ref(false);

const createBook = async () => {
  const date = new Date();

  if(registerBook.value.title !== "" && registerBook.value.author !== "" && parseInt(registerBook.value.publicationYear) <= date.getFullYear() && parseInt(registerBook.value.availbleCopies) <= parseInt(registerBook.value.copies)) {
    const createBook = await axios.post("http://localhost:3001/books", {
      title: registerBook.value.title,
      description: registerBook.value.description,
      author: registerBook.value.author,
      publicationYear: parseInt(registerBook.value.publicationYear),
      copies: parseInt(registerBook.value.copies),
      availbleCopies: parseInt(registerBook.value.availbleCopies),
      categoryId: selectedCategory.value,
    });
    if(createBook) {
      if(createBook.status == 201) {
        books.value.push(createBook.data);
        activeModal.value = true;
      }
      return createBook;
    }
  } else {
    window.alert("Informações inconsistentes, verifique se os campos estão preenchidos corretamente!");
  }
};

const deleteBook = async (id: number) => {
  const deleteBook = await axios.delete(`http://localhost:3001/books/${id}`);
  if(deleteBook.status == 200) {
    window.alert("Livro excluído com sucesso!");
    books.value.filter(s => s.id !== deleteBook.data.id);
  }
  return deleteBook;
};

const updateBook = async (id: number) => {
  const date = new Date();

  if(editBook.value.title !== "" && editBook.value.author !== "" && parseInt(editBook.value.publicationYear) <= date.getFullYear() && parseInt(editBook.value.availbleCopies) <= parseInt(editBook.value.copies)) {
    const updateBook = await axios.patch(`http://localhost:3001/books/${id}`, {
      title: editBook.value.title,
      description: editBook.value.description,
      author: editBook.value.author,
      publicationYear: parseInt(editBook.value.publicationYear),
      copies: parseInt(editBook.value.copies),
      availbleCopies: parseInt(editBook.value.availbleCopies),
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
  if(reserveBook) {
    if (reserveBook.status == 200 && reserveBook.data !== "") window.alert("Livro reservado com sucesso!");
    return reserveBook;
  }
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
