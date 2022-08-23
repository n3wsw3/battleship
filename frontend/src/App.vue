<template>
  <StartView v-if="!hasJoinedGame" :socket="socket" @joinGame="hasJoinedGame=true" />
  <GameView v-if="hasJoinedGame" :socket="socket" />
</template>

<script setup lang="ts">
import GameView from './views/GameView.vue'
import StartView from './views/StartView.vue'
import {io} from "socket.io-client";
import {Socket} from "./types";
import {ref} from "vue";

const socket: Socket = io("http://localhost:3000");
let hasJoinedGame = ref(false)

socket.on("connect", () => {
  console.log("Connected to websocket!")
})

socket.on("player_joined", () => {
  console.log("Another player joined")
})

socket.on("shoot", () => {
  console.log("Another player shot")
})

socket.on("game_finished", () => {
  console.log("Game finished")
})
</script>