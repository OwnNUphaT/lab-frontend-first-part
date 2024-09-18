<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Organizer } from '@/types'

const props = defineProps<{
  organizer: Organizer
}>()
const { organizer } = toRefs(props)
</script>

<template>
  <div>
    <h2>Organizer Details</h2>
    <p>Organization Name: {{ organizer.organizationName }}</p>
    <p>Address: {{ organizer.address }}</p>
  </div>
</template>
