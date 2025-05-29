<script setup lang="ts">
import SeriesList from '@/components/serie/SeriesList.vue'
import SeriesSave from '@/components/serie/SeriesSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const serieListRef = ref<typeof SerieList | null>(null)
const serieEdit = ref<any>(null)

function handleCreate() {
  serieEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(serie: any) {
  serieEdit.value = serie
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  serieListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="contenedor">
    <h1>Series</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" class="col-3" />
    <SeriesList ref="serieListRef" @edit="handleEdit" />
    <SeriesSave
      :mostrar="mostrarDialog"
      :serie="serieEdit"
      :modoEdicion="!!serieEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.contenedor {
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
