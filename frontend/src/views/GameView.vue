<template>
  <div>
    <button @click="readyUp">Ready Up</button>
    <GameBoard :ships="ships" :shots="shots" user_id="You"/>
    <GameBoard @shoot="shoot" :ships="otherShips" :shots="otherShots" :user_id="props.other_player"/>
    <ShipSelector @readyUp="readyUp" @updateShips="(newValue) => { this.ships = newValue }" />
  </div>
</template>

<script setup lang="ts">
import { ICoord } from 'backend';
import GameBoard from '../components/GameBoard.vue';
import ShipSelector from '../components/ShipSelector.vue';
import { Socket } from '../types';

const props = defineProps<{ socket: Socket, other_player: string }>()

const ships = reactive<Array<Array<ICoord>>>([[{ x: 1, y: 1 }, { x: 1, y: 2 }]]);
const shots = reactive<Array<ICoord>>([]);

const otherShips = reactive<Array<Array<ICoord>>>([]);
const otherShots = reactive<Array<ICoord>>([]);

const readyUp = () => {
  props.socket.emit('ready_up', ships, ({ msg, error }) => {
    console.log(msg, error)
  });
}

// Other person is shooting on your ships
props.socket.on("shoot", ({ error, ...hit }) => {
  if (error) return console.log(error);
  shots.push({ x: hit.x || -1, y: hit.y || -1 })
})

// You are shooting on the other person's ships
const shoot = (coord: ICoord) => {
  console.log(coord);
  props.socket.emit("shoot", coord, ({ error, ...hit }) => {
    if (error) return console.log(error);

    let pos: ICoord = { x: hit.x || -1, y: hit.y || -1 };
    otherShots.push(pos);
    if (hit.is_hit) otherShips.push([pos])
    if (hit.killed_ship) console.log("KILLED SHIP!");
  })
}

</script>
