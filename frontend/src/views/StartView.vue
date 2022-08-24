<template>
  <div class="bg-gray-50">
    <div>
      <input id="create" type="radio" value="create" v-model="method">
      <label for="create">Create</label>
      <input id="join" type="radio" value="join" v-model="method">
      <label for="join">Join</label>
    </div>
    <label for="gameId">Game ID</label>
    <input type="text" id="gameId" v-model="gameId" @keyup.enter="joinGame">
    <button @click="joinGame">Join game</button>
  </div>
</template>

<script setup lang="ts">
import { Socket } from "../types";
import {Ref, ref} from "vue";

const props = defineProps<{socket: Socket}>()
const emit = defineEmits<{
  (e: "joinGame", gameId: string): void,
}>()

const gameId = ref("")
const method: Ref<"create"|"join"> = ref("create")

const joinGame = () => {
  props.socket.emit(method.value, gameId.value, ({ msg, error }) => {
    console.log(msg, error)
    if (error) return
    emit("joinGame", gameId.value)
  })
}
</script>