<template>
  <SideMenu />
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="Criar">Criar</v-tab>
      <v-tab value="Listar">Listar</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Criar">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="categoryName"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-btn variant="outlined" class="ml-4" @click="createCategory">Criar</v-btn>
        </v-window-item>

        <v-window-item value="Listar">
          <div v-if="showEdit == true">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="categoryNameEdit"
                      label="Nome"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-btn @click="updateCategory(categoryId!)">Salvar</v-btn>
          </div>
          <div
            class="d-flex ga-3 align-center mt-3"
            v-for="(category, index) in categories"
            :key="category.id"
          >
            <v-card class="pa-3">{{ category.name }}</v-card>
            <v-icon
              icon="$edit"
              class="cursor-pointer"
              @click="(showEdit = true), (categoryId = category.id)"
            ></v-icon>
            <v-icon
              class="cursor-pointer"
              icon="mdi-delete"
              @click="deleteCategory(category.id)"
            ></v-icon>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  <Modal 
    message="Categoria cadastrada com sucesso!"
    title="Categoria cadastrada"
    :isActive="activeModal"
  />
</template>

<script lang="ts" setup>
import SideMenu from "../components/SideMenu.vue";
import Modal from "../components/Modal.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { ICategory } from "../interfaces";

const tab = ref("");
const categoryName = ref("");
const categoryNameEdit = ref("");
const categoryId = ref<number>();
const categories = ref<ICategory[]>([]);
const showEdit = ref(false);

const activeModal = ref(false);

const createCategory = async () => {
  if(categoryName.value !== "") {
    const createCategory = await axios.post("http://localhost:3001/categories", {
      name: categoryName.value,
    });
    if(createCategory) {
      if (createCategory.status == 201) activeModal.value = true;
      return createCategory;
    }
    categoryName.value = "";
  }
};

const fetchCategories = async () => {
  const fetchCategories = await axios.get("http://localhost:3001/categories");
  categories.value = fetchCategories.data;
  return fetchCategories;
};

const deleteCategory = async (id: number) => {
  const deleteCategory = await axios.delete(
    `http://localhost:3001/categories/${id}`
  );
  if (deleteCategory.status == 200)
    window.alert("Categoria deletada com sucesso!");
  return deleteCategory;
};

const updateCategory = async (id: number) => {
  if(categoryNameEdit.value !== "") {
    const updateCategory = await axios.patch(
      `http://localhost:3001/categories/${id}`,
      {
        name: categoryNameEdit.value,
      }
    );
    if (updateCategory.status == 200)
      window.alert("Categoria atualizada com sucesso!");
    
    return updateCategory;
  }
};

onMounted(fetchCategories);
</script>
