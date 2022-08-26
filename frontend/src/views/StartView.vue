<template>
  <div class="h-full flex items-center justify-center">
    <div
      class="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-100"
    >
      <div class="flex justify-center mb-10">
        <img src="/logo_full_2.svg" alt="Battleship logo" class="w-44" />
      </div>
      <div class="mb-2">
        <input id="create" type="radio" value="create" v-model="method" />
        <label for="create" class="ml-1 mr-3">Create</label>
        <input id="join" type="radio" value="join" v-model="method" />
        <label for="join" class="ml-1">Join</label>
      </div>
      <div class="w-full">
        <label for="gameId" class="mr-3">Game ID</label>
        <input
          type="text"
          id="gameId"
          v-model="gameId"
          @keyup.enter="joinGame"
          class="p-1 rounded-md font-mono border-gray-100 border"
        />
      </div>
      <button
        @click="joinGame"
        class="bg-core rounded-md text-white py-2 w-full mt-6"
      >
        Join game
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Socket } from "../types";

const props = defineProps<{ socket: Socket }>();
const emit = defineEmits<{
  (e: "joinGame", gameId: string): void;
}>();

const gameId = ref("");
const method = ref<"create" | "join">("create");

const joinGame = () => {
  props.socket.emit(method.value, gameId.value, ({ msg, error }) => {
    console.log(msg, error);
    if (error) return;
    emit("joinGame", gameId.value);
  });
};
</script>
