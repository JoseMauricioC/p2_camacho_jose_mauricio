<script setup lang="ts">
import type { Serie } from '@/models/serie'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button } from 'primevue'

const ENDPOINT = 'series'
const series = ref<Serie[]>([])
const emit = defineEmits(['edit'])

async function obtenerLista() {
  series.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(serie: Serie) {
  emit('edit', serie)
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table style="border-collapse: collapse" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Titulo</th>
          <th>Sinopsis</th>
          <th>Director</th>
          <th>Temporadas</th>
          <th>Fecha de Estreno</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(serie, index) in series" :key="serie.id">
          <td>{{ index + 1 }}</td>
          <td>{{ serie.titulo }}</td>
          <td>{{ serie.sinopsis }}</td>
          <td>{{ serie.director }}</td>
          <td>{{ serie.temporadas }}</td>
          <td>{{ serie.fechaEstreno }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(serie)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text severity="danger" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
