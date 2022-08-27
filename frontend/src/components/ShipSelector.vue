<template>
  <div
    class="px-2 border-l-2 border-gray-200 bg-gray-100 h-full overflow-y-auto"
  >
    <h3 class="font-bold text-xl text-center my-4">Place ships</h3>
    <ul>
      <ShipSelectorShip
        v-for="(ship, index) in props.ships"
        :ship="ship"
        :isSelected="selectedShip === ship"
        @click="emit('updateShips', index)"
        @rotateShip="emit('rotateShip', index)"
      ></ShipSelectorShip>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { AvailableShip } from "../types";
import ShipSelectorShip from "./ShipSelectorShip.vue";

const props = defineProps<{
  ships: AvailableShip[];
  selectedShip: AvailableShip;
}>();

const emit = defineEmits<{
  (e: "readyUp"): void;
  (e: "updateShips", index: number): void;
  (e: "rotateShip", shipIndex: number): void;
}>();

const readyUp = () => {
  if (props.ships.every(ship => ship.placed)) {
    emit("readyUp");
  } else {
    console.log("Tried readying up without all ships placed");
  }
};

watch(props.ships, () => {
  if (props.ships.every(ship => ship.placed)) {
    emit("readyUp");
  }
});
</script>
