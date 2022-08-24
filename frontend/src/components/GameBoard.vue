<template>
  <GameBoardBoard :user_id="user" :ships="ships" :shots="shots" @shoot="shoot"/>
</template>

<script setup lang="ts">
import {ICoord} from "backend";
import GameBoardBoard from "./GameBoardBoard.vue";

const ships = reactive<Array<Array<ICoord>>>([[{x: 1, y: 1}, {x: 1, y: 2}]]);
const shots = reactive<Array<ICoord>>([{x: 1, y: 1}, {x: 2, y:2}]);

const user = ref("test_user");

const shoot = (coord: ICoord) => {
  shots.push(coord);
}

</script>
