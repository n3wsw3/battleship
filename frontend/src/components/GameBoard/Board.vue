<template>
  <div
    :style="{ '--size': 100 / props.size.x + '%' }"
    class="border-2 border-black rounded-xl overflow-hidden"
  >
    <div v-for="index in props.size.x" class="row">
      <GameBoardSquare
        v-for="jndex in props.size.y"
        :has_ship="isShip({ x: jndex, y: index })"
        :is_shot="isShot({ x: jndex, y: index })"
        @shoot="emit('shoot', { x: jndex, y: index })"
        class="first:border-l-0 last:border-r-0"
        :class="{
          'border-t-0': index === 1,
          'border-b-0': index === props.size.x,
        }"
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
  size: ICoord;
}>();

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
