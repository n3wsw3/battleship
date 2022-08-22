<template>
  <ShipSelector @startGame="$emit('startGame')" />
</template>

<script setup lang="ts">
import ShipSelector from '../components/ShipSelector.vue';
import {defineProps} from "vue";
import {io} from "socket.io-client";

const props = defineProps<{socket: ReturnType<typeof io> }>()
defineEmits(["startGame"])
</script>