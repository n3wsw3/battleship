<template>
  <div class="m-3">
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
</template>

<script setup lang="ts">
import { ICoord } from "backend";
import GameBoardBoard from "./GameBoard/Board.vue";

const emit = defineEmits<{
  (e: "shoot", coord: ICoord): void;
}>();

const props = defineProps<{
  ships: Array<Array<ICoord>>;
  shots: Array<ICoord>;
  user_id: string;
  size: ICoord;
  turn_id: string;
}>();
</script>

<style>
.board {
  width: 400px;
  height: 400px;
}
</style>
