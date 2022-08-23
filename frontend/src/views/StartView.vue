<template>
  <JoinBox :socket="props.socket" @joinGame="$emit('joinGame')" />
</template>

<script setup lang="ts">
import {io} from "socket.io-client";
import JoinBox from "../components/JoinBox.vue";

const props = defineProps<{socket: ReturnType<typeof io> }>()
defineEmits(["joinGame"])
</script>