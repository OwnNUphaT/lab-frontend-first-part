<script setup lang="ts">
import type { Organizer } from '@/types';
import { ref } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import ImageUpload from '@/components/ImageUpload.vue';

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  address: '',
  images: [],
});

const router = useRouter();
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({ name: 'organizer', params: { id: response.data.id } });
      store.updateMessage('You have successfully added a new organization: ' + response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}
</script>

<template>
  <div class="form-container">
    <h1>Create an Event</h1>
    <form @submit.prevent="saveOrganizer" class="event-form">
      <div class="form-group">
        <label for="organizationName">Organization Name</label>
        <input
          id="organizationName"
          v-model="organizer.name"
          type="text"
          placeholder="Enter organization name"
          class="field"
        />
      </div>
      
      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          v-model="organizer.address"
          type="text"
          placeholder="Enter address"
          class="field"
        />
      </div>

      <div>
        <h3>The image of the event</h3>
        <ImageUpload v-model="organizer.images" />
      </div>

      <button class="button" type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.event-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
</style>
