<template>
<div>
  <GameBoard />
  <ShipSelector @readyUp="readyUp" @updateShips="(newValue) => {this.ships = newValue}" />
</div>
</template>

<script setup lang="ts">
import { IShip } from 'backend';
import GameBoard from '../components/GameBoard.vue';
import ShipSelector from '../components/ShipSelector.vue';
import { Socket } from '../types';

const props = defineProps<{socket: Socket }>()

const ships = reactive<IShip[]>([])

const readyUp = () => {
  props.socket.emit('ready_up', ships.map(ship => ship.coords), ({ msg, error }) => {
    console.log(msg, error)
  });
}
</script>
