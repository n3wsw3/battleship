<template>
  <button @click="$emit('startGame')">Start Game</button>
</template>

<script setup lang="ts">
defineEmits(["startGame"])
</script>
