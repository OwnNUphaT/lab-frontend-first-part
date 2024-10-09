<script setup lang="ts">
interface ErrorMessgaeProps {
    id: string
}
defineProps<ErrorMessgaeProps>()
</script>

<template>
    <p aria-live="assertive" class="errorMessage" :id="id">
        <slot />
    </p>
</template>