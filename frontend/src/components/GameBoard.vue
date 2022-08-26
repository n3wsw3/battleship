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
}>();
</script>

<style>
.board {
  width: 400px;
  height: 400px;
}
</style>
