<template>
    <v-dialog max-width="500" v-model="value">
        <v-card :title="title">
        <v-card-text>
            {{ message }}
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            text="Fechar"
            @click="value = false"
            ></v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps(["message", "title", "isActive"]);

const value = ref<boolean>(false);

watch(() => props.isActive, (newValue) => {
    value.value = newValue;
});
</script>