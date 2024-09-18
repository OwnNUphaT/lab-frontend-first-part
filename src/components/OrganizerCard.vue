<script setup lang="ts">
import { type Organizer } from '@/types'
const props = defineProps<{
  organizer: Organizer
}>()
</script>

<template>
 <RouterLink class="text-[#2c3e50] no-underline">
  <div class="event-class">
    <div 
    class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <span>{{ props.organizer.organizationName }} @ {{ props.organizer.address }}</span>
    </div>
  </div>
</RouterLink>
</template>

<style scoped>
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
