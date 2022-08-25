<template>
  <div>
    <h3>Place ships</h3>
    <ul>
      <ShipSelectorShip
        v-for="(ship, index) in props.ships"
        :ship="ship"
        @click="emit('updateShips', index)"
      ></ShipSelectorShip>
    </ul>
    <button @click="readyUp">Ready</button>
  </div>
</template>

<script setup lang="ts">
import { AvailableShip } from "../types";
import ShipSelectorShip from "./ShipSelectorShip.vue";

const props = defineProps<{ ships: AvailableShip[] }>();

const emit = defineEmits<{
  (e: "readyUp"): void;
  (e: "updateShips", index: number): void;
}>();

const readyUp = () => {
  if (props.ships.every(ship => ship.placed)) {
    emit("readyUp");
  } else {
    console.log("Tried readying up without all ships placed");
  }
};
</script>
