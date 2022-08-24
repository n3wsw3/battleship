<template>
  <h3>Place ships</h3>

  <ul>
    <ShipSelectorShip v-for="ship in ships" :ship="ship"></ShipSelectorShip>
  </ul>

  <button @click="readyUp">Ready</button>
</template>

<script setup lang="ts">
import ShipSelectorShip from "./ShipSelectorShip.vue";
import {reactive} from "vue";
import {AvailableShip} from "../types";


const ships: AvailableShip[] = reactive([
  {name: "patrol boat", length: 2, placed: false, orientation: "horizontal"},
  {name: "submarine", length: 3, placed: false, orientation: "horizontal"},
  {name: "destroyer", length: 3, placed: false, orientation: "horizontal"},
  {name: "battleship", length: 4, placed: false, orientation: "horizontal"},
  {name: "carrier", length: 5, placed: false, orientation: "horizontal"},
])

const emit = defineEmits<{
  (e: "readyUp"): void,
  (e: "updateShips", newValue: string): void,
}>()

const readyUp = () => {
  if (ships.every(ship => ship.placed)) {
    emit("readyUp")
  }
}
</script>
