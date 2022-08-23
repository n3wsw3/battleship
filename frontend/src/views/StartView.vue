<template>
  <JoinBox :socket="props.socket" @joinGame="$emit('joinGame')" />
</template>

<script setup lang="ts">
import {io} from "socket.io-client";
import JoinBox from "../components/JoinBox.vue";
import { Socket } from "../types";

const props = defineProps<{socket: Socket }>()
defineEmits(["joinGame"])
</script>