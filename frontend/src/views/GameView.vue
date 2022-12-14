<template>
  <div class="h-full">
    <div
      class="h-full"
      :class="{ 'grid grid-cols-3 md:grid-cols-4': !isReady }"
    >
      <div
        class="flex flex-col items-center w-full h-full p-3"
        :class="{ 'col-span-2 md:col-span-3': !isReady }"
      >
        <div
          class="w-full px-3 mt-4 mb-10 flex sm:justify-center hover:cursor-pointer"
          @click="reload"
        >
          <img src="/logo_full_1.svg" alt="Battleship logo" class="h-12" />
        </div>
        <div class="flex flex-wrap">
          <GameBoard
            @shoot="placeShip"
            :ships="ships"
            :shots="shots"
            user_id="You"
            :opponent_joined="props.other_player !== ''"
            :game_started="props.other_player !== ''"
            :gameId="props.gameId"
            :size="gameSize"
            :gameStarted="gameStarted"
          />
          <GameBoard
            @shoot="shoot"
            :ships="otherShips"
            :shots="otherShots"
            :user_id="props.other_player"
            :opponent_joined="props.other_player !== ''"
            :gameId="props.gameId"
            :size="gameSize"
            :gameStarted="gameStarted"
          />
        </div>
      </div>
      <ShipSelector
        v-if="!elstrellaSelected"
        :ships="shipsAvailable"
        :selectedShip="selectedShip"
        @readyUp="readyUp"
        @updateShips="setShipIndex"
        @rotateShip="rotateShip"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICoord } from "backend/src/game/store";
import GameBoard from "../components/GameBoard.vue";
import ShipSelector from "../components/ShipSelector.vue";
import { AvailableShip, Socket } from "../types";
import { ref } from "vue";

const props = defineProps<{
  socket: Socket;
  other_player: string;
  gameId: string;
}>();

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

const gameSize = reactive<ICoord>({ x: 10, y: 10 });
const ships = reactive<Array<Array<ICoord>>>([]);
const shots = reactive<Array<ICoord>>([]);
const otherShips = reactive<Array<Array<ICoord>>>([]);
const otherShots = reactive<Array<ICoord>>([]);
const elstrellaSelected = ref(false);
const isReady = ref(false);
const gameStarted = ref(false);

const readyUp = () => {
  props.socket.emit("ready_up", ships, ({ msg, error }) => {
    if (error) return console.log(error);

    isReady.value = true;
    console.log(msg);
  });
  elstrellaSelected.value = true;
};

const reload = () => {
  window.location.reload();
};

const rotateShip = (shipIndex: number) => {
  if (shipsAvailable[shipIndex].orientation === "horizontal") {
    shipsAvailable[shipIndex].orientation = "vertical";
  } else {
    shipsAvailable[shipIndex].orientation = "horizontal";
  }
};

// Other person is shooting on your ships
props.socket.on("shoot", ({ error, ...hit }) => {
  if (error) return console.log(error);
  shots.push({ x: hit.x || -1, y: hit.y || -1 });
});

props.socket.on("start_game", () => {
  gameStarted.value = true;
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
  if (isReady.value) return console.log("Cannot Place Ship When Ready!");
  if (!selectedShip.value) return console.log("No ship selected!");
  if (selectedShip.value.placed) return console.log("Ship already placed!");

  let shipMapper: (_: any, i: number) => ICoord =
    selectedShip.value.orientation === "horizontal"
      ? (_, i) => ({ x: coord.x + i, y: coord.y })
      : (_, i) => ({ x: coord.x, y: coord.y + i });

  let shipPos = Array.from({ length: selectedShip.value.length }, shipMapper);

  if (!shipPos.every(pos => pos.x <= gameSize.x && pos.y <= gameSize.y))
    return console.log("Trying to place ship outside game board!");

  console.log(
    `place ship ${selectedShip.value.name} at ${coord.x}, ${coord.y}`
  );
  ships.push(shipPos);
  selectedShip.value.placed = true;
};

const setShipIndex = (index: number) => {
  selectedShipIndex.value = index;
  console.log(index);
};
</script>
