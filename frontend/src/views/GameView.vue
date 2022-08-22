<template>
<div>
  <h1>Game view</h1>
  <GameBoard />
</div>
</template>

<script setup lang="ts">
import GameBoard from '../components/GameBoard.vue';
import {defineProps} from "vue";
import {io} from "socket.io-client";

const props = defineProps<{socket: ReturnType<typeof io> }>()

props.socket.on("connect", () => {
  console.log("Connected to websocket!")
})

props.socket.on("player_joined", () => {
  console.log("Another player joined")
})

props.socket.on("shoot", () => {
  console.log("Another player shot")
})

props.socket.on("game_finished", () => {
  console.log("Game finished")
})
</script>
