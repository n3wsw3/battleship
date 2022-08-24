<template>
  <GameBoardBoard :user_id="props.user_id" :ships="props.ships" :shots="props.shots" @shoot="(coord) => emit('shoot', coord)"
    class="board" />
</template>

<script setup lang="ts">
import { ICoord } from "backend";
import GameBoardBoard from "./GameBoard/Board.vue";

const emit = defineEmits<{
  (e: 'shoot', coord: ICoord): void;
}>();

const props = defineProps<{
  ships: Array<Array<ICoord>>;
  shots: Array<ICoord>;
  user_id: string;
}>();

</script>

<style>
.board {
  width: 400px;
  height: 400px;
}
</style>