<template>
  <div :style="{ '--size': 100 / width + '%' }">
    <div v-for="index in width" class="row">
      <GameBoardSquare
        v-for="jndex in height"
        :has_ship="isShip({ x: jndex, y: index })"
        :is_shot="isShot({ x: jndex, y: index })"
        @shoot="emit('shoot', { x: jndex, y: index })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICoord } from "backend";
import GameBoardSquare from "./Square.vue";

const emit = defineEmits<{
  (e: "shoot", coord: ICoord): void;
}>();

const props = defineProps<{
  ships: Array<Array<ICoord>>;
  shots: Array<ICoord>;
  user_id: string;
}>();

const width = ref(10);
const height = ref(10);

const isShip = (coord: ICoord): boolean => {
  return !!props.ships.find(ship => {
    return ship.find(shipCoord => {
      return shipCoord.x == coord.x && shipCoord.y == coord.y;
    });
  });
};

const isShot = (coord: ICoord): boolean => {
  return !!props.shots.find(shot => {
    return shot.x == coord.x && shot.y == coord.y;
  });
};
</script>
