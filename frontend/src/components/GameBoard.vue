<template>
  <div class="m-3">
    <div class="relative">
      <div
        v-if="user_id !== 'You' && !opponent_joined && !gameStarted"
        class="absolute h-full w-full"
      >
        <div
          class="h-full w-full bg-white bg-opacity-95 flex justify-center items-center"
        >
          <div class="bg-white text-center max-w-xs p-4 rounded-md">
            <h4 class="text-xl font-bold mb-3">
              Waiting for opponent{{ ".".repeat(dots) }}
            </h4>
            <div>
              Ask them to go to
              <a :href="siteUrl" class="text-core font-bold font-mono">{{
                siteUrl
              }}</a>
              and join using the Game ID
              <span class="text-core font-bold font-mono">{{ gameId }}</span
              >.
            </div>
            <div class="bg-"></div>
          </div>
        </div>
      </div>
      <GameBoardBoard
        :user_id="props.user_id"
        :ships="props.ships"
        :shots="props.shots"
        :size="props.size"
        @shoot="coord => emit('shoot', coord)"
        class="board"
      />
      <h3 class="font-mono mt-2 uppercase text-center">
        {{ user_id === "You" ? "your" : "opponent's" }} board
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICoord } from "backend/src/game/store";
import GameBoardBoard from "./GameBoard/Board.vue";

const emit = defineEmits<{
  (e: "shoot", coord: ICoord): void;
}>();

const props = defineProps<{
  ships: Array<Array<ICoord>>;
  shots: Array<ICoord>;
  user_id: string;
  opponent_joined: boolean;
  gameStarted: boolean;
  gameId: string;
  size: ICoord;
}>();

const siteUrl = window.location.origin;
let dots = ref(0);

const updateDots = () => {
  if (dots.value < 3) {
    dots.value++;
  } else {
    dots.value = 0;
  }
  if (!props.opponent_joined) {
    setTimeout(updateDots, 500);
  }
};

updateDots();
</script>

<style>
.board {
  width: 400px;
  height: 400px;
}
</style>
