<template>
  <div class="h-full">
    <div class="grid grid-cols-3 md:grid-cols-4 h-full">
      <div class="col-span-2 md:col-span-3 flex">
        <GameBoard
          :ships="ships"
          :shots="shots"
          user_id="You"
          @shoot="placeShip"
        />
        <GameBoard
          @shoot="shoot"
          :ships="otherShips"
          :shots="otherShots"
          :user_id="props.other_player"
        />
        <button @click="readyUp">Ready Up</button>
      </div>
      <ShipSelector
        v-if="!elstrellaSelected"
        :ships="shipsAvailable"
        @readyUp="readyUp"
        @updateShips="setShipIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICoord } from "backend";
import GameBoard from "../components/GameBoard.vue";
import ShipSelector from "../components/ShipSelector.vue";
import { AvailableShip, Socket } from "../types";

const props = defineProps<{ socket: Socket; other_player: string }>();

const shipsAvailable = reactive<AvailableShip[]>([
  { name: "patrol boat", length: 2, placed: false, orientation: "horizontal" },
  { name: "submarine", length: 3, placed: false, orientation: "horizontal" },
  { name: "destroyer", length: 3, placed: false, orientation: "horizontal" },
  { name: "battleship", length: 4, placed: false, orientation: "horizontal" },
  { name: "carrier", length: 5, placed: false, orientation: "horizontal" },
]);
const selectedShipIndex = ref<number>(-1);
const selectedShip = computed(() => {
  if (selectedShipIndex.value < 0) return;
  return shipsAvailable[selectedShipIndex.value];
});

const ships = reactive<Array<Array<ICoord>>>([
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
]);
const shots = reactive<Array<ICoord>>([]);
const otherShips = reactive<Array<Array<ICoord>>>([]);
const otherShots = reactive<Array<ICoord>>([]);
const elstrellaSelected = ref(false);
const isReady = ref(false);

const readyUp = () => {
  props.socket.emit("ready_up", ships, ({ msg, error }) => {
    if (error) return console.log(error);

    isReady.value = true;
    console.log(msg);
  });
  elstrellaSelected.value = true;
};

// Other person is shooting on your ships
props.socket.on("shoot", ({ error, ...hit }) => {
  if (error) return console.log(error);
  shots.push({ x: hit.x || -1, y: hit.y || -1 });
});

// You are shooting on the other person's ships
const shoot = (coord: ICoord) => {
  if (!isReady.value) return console.log("Not ready yet");

  console.log(coord);
  props.socket.emit("shoot", coord, ({ error, ...hit }) => {
    if (error) return console.log(error);

    let pos: ICoord = { x: hit.x || -1, y: hit.y || -1 };
    otherShots.push(pos);
    if (hit.is_hit) otherShips.push([pos]);
    if (hit.killed_ship) console.log("KILLED SHIP!");
  });
};

const placeShip = (coord: ICoord) => {
  if (isReady.value) return console.log("Cannot Place Ship When Ready");
  if (!selectedShip.value) return console.log("No ship selected");

  console.log(
    `place ship ${selectedShip.value.name} at ${coord.x}, ${coord.y}`
  );
};

const setShipIndex = (index: number) => {
  selectedShipIndex.value = index;
  console.log(index);
};
</script>
