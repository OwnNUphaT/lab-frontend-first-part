<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OrganizerService from '@/services/OrganizerService';
import type { Organizer } from '@/types';

const route = useRoute();
const organizer = ref<Organizer | null>(null);

onMounted(() => {
  const id = route.params.id as string;
  OrganizerService.getOrganizerById(parseInt(id))
    .then((response) => {
      organizer.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching organizer:', error);
    });
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="organizer" class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-dark-blue mb-4 text-center">{{ organizer.name }}</h1>
      <p class="text-medium-gray mb-2 text-center">{{ organizer.address }}</p>
      <div class="flex flex-wrap justify-center gap-4 mt-4">
        <img
          v-for="image in organizer.images"
          :key="image"
          :src="image"
          alt="Organizer Image"
          class="rounded-lg shadow-md w-60 h-auto object-cover"
        />
      </div>
    </div>
    <div v-else class="text-center text-red-500">Loading organizer details...</div>
  </div>
</template>
