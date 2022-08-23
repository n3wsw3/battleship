<template>
<div>
  <GameBoard />
  <ShipSelector @readyUp="readyUp" @updateShips="(newValue) => {this.ships = newValue}" />
</div>
</template>

<script setup lang="ts">
import GameBoard from '../components/GameBoard.vue';
import ShipSelector from '../components/ShipSelector.vue';
import {reactive} from "vue";
import {io} from "socket.io-client";
import { Socket } from '../types';

interface Coordinate {
  x: number;
  y: number;
}
interface ship extends Array<Coordinate>{}
interface ResponseType {
  msg?: string;
  err?: string;
}

const props = defineProps<{socket: Socket }>()

const ships: ship[] = reactive([])

const readyUp = () => {
  props.socket.emit('ready_up', ships, ({ msg, error }) => {
    console.log(msg, error)
  });
}
</script>
