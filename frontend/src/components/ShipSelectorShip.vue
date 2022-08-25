<template>
  <li>
    <h4>{{ ship.name.toUpperCase() }}</h4>
    <img src="#" :alt="`${ship.name} of length ${ship.length}`" />
  </li>
</template>

<script setup lang="ts">
import { AvailableShip } from "../types";

const props = defineProps<{ ship: AvailableShip }>();
</script>
