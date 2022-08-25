<template>
  <StartView v-if="!hasJoinedGame" :socket="socket" @joinGame="hasJoinedGame=true" />
  <GameView v-if="hasJoinedGame" :socket="socket" :other_player="otherPlayer" />
</template>

<script setup lang="ts">
import GameView from './views/GameView.vue'
import StartView from './views/StartView.vue'
import {io} from "socket.io-client";
import {Socket} from "./types";

const socket: Socket = io("http://localhost:3000");
let hasJoinedGame = ref(false)
const otherPlayer = ref("");

socket.on("connect", () => {
  console.log("Connected to websocket!")
})

socket.on("player_joined", (otherPlayerId) => {
  console.log("Another player joined")
  otherPlayer.value = otherPlayerId;
})

socket.on("shoot", () => {
  console.log("Another player shot")
})

socket.on("game_finished", () => {
  console.log("Game finished")
})
</script>