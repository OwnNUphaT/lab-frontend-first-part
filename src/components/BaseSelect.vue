<script setup lang="ts">
import type { Organizer } from '@/types';

const modelValue = defineModel ()
interface BaseSelectProps {
    label: string
    options: Organizer[]
}
const props = withDefaults(defineProps<BaseSelectProps> (), {
    label: ''
})
</script>
<template>
    <label v-if="props.label">
        {{ props.label }}
    </label>
    <select class="mb-6" v-bind="$attrs" v-model="modelValue">
        <option v-for="option in props.options" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
</template>