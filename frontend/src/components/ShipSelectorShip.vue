<template>
  <li
    class="w-full flex flex-col content-between p-3 rounded-lg mb-2 bg-gray-50 items-center"
  >
    <div class="h-full">
      <img
        :src="imageUrl"
        :alt="`${ship.name} of length ${ship.length}`"
        class="m-2 rounded-md overflow-hidden"
      />
    </div>
    <h4 class="font-mono">{{ ship.name }}</h4>
  </li>
</template>

<script setup lang="ts">
import { AvailableShip } from "../types";

const props = defineProps<{ ship: AvailableShip }>();

const imageUrl = computed(() => {
  let size;
  const scale = 40;
  if (props.ship.orientation === "horizontal") {
    size = `${props.ship.length * scale}x${scale}`;
  } else {
    size = `${scale}x${props.ship.length * scale}`;
  }
  return `https://via.placeholder.com/${size}?text=${props.ship.name}`;
});
</script>
