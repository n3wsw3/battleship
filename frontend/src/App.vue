<template>
  <StartView v-if="!hasJoinedGame" :socket="socket" @startGame="hasJoinedGame=true" />
  <GameView v-if="hasJoinedGame" :socket="socket" />
</template>

<script setup lang="ts">
import GameView from './views/GameView.vue'
import StartView from './views/StartView.vue'
import {io} from "socket.io-client";
import {ref} from "vue";

const socket = io("http://localhost:3000");
let hasJoinedGame = ref(false)
</script>