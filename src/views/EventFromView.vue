<script setup lang="ts">
import type { Event, Organizer } from '@/types';
import { onMounted, ref } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import OrganizerService from '@/services/OrganizerService';
import BaseSelect from '@/components/BaseSelect.vue';
import ImageUpload from '@/components/ImageUpload.vue';

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: '',
    address: '',
    images: []
  },
  images: [],
});
const router = useRouter();
const store = useMessageStore();

function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } });
      store.updateMessage('You are successfully adding a new event for ' + 
      response.data.title);
      setTimeout(() => {
        store.resetMessage();
      }, 3000);
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}
const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push ({ name: 'network-error-view' })
  })
})
</script>

<template>
  <div class="container">
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent" class="form">
      <h3 class="section-heading">Event Details</h3>

      <div class="form-group">
        <label for="category">Category</label>
        <BaseInput v-model="event.category" type="text" id="category" placeholder="Category" />
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <BaseInput v-model="event.title" type="text" id="title" placeholder="Title" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <BaseInput v-model="event.description" type="text" id="description" placeholder="Description" />
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <BaseInput v-model="event.location" type="text" id="location" placeholder="Location" />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <BaseInput v-model="event.date" type="date" id="date" placeholder="Date" />
      </div>

      <div class="form-group">
        <label for="time">Time</label>
        <BaseInput v-model="event.time" type="time" id="time" placeholder="Time" />
      </div>

      <div class="form-group">
        <label for="petsAllowed">Pets Allowed</label>
        <BaseInput v-model="event.petsAllowed" type="checkbox" id="petsAllowed" />
      </div>

      <div class="form-group">
        <label for="organizer">Organizer</label>
        <BaseInput v-model="event.organizer.name" type="text" id="organizer" placeholder="Organizer" />
        <h3>Who is your organizer?</h3>
        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
      </div>

      <div>
        <h3>The image of the event</h3>
        <ImageUpload v-model="event.images" />
      </div>

      <button class="submit-button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.section-heading {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
  display: block;
}

.submit-button {
  padding: 12px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
}

pre {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
