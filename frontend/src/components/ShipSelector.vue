<template>
  <h3>Place ships</h3>

  <button @click="emit('readyUp')">Ready</button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "readyUp"): void,
  (e: "updateShips", newValue: string): void,
}>()
</script>
