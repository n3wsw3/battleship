<template>
  <div class="h-full flex items-center justify-center">
    <div class="bg-gray-50 rounded-lg p-6 border border-gray-100">
      <div class="flex justify-center mb-10">
        <img src="/logo_full_2.svg" alt="Battleship logo" class="w-44" />
      </div>
      <div class="my-8">
        <FancyToggle
          :options="['create', 'join']"
          v-model="method"
          class="mb-1"
        />
        <div class="w-full mt-2">
          <label for="gameId" class="mr-3">Game ID</label>
          <input
            type="text"
            id="gameId"
            v-model="gameId"
            @keyup.enter="joinGame"
            autocomplete="off"
            class="p-2 rounded-md font-mono border-gray-100 border-2 border"
          />
        </div>
      </div>
      <button
        @click="joinGame"
        class="rounded-md text-white font-semibold py-2 w-full bg-core hover:bg-core-dark"
      >
        Join game
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Socket } from "../types";
import FancyToggle from "../components/FancyToggle.vue";

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
