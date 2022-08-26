<template>
  <li
    class="w-full flex flex-col content-between p-3 rounded-lg mb-2 items-center hover:cursor-pointer"
    :class="{
      'bg-gray-50 outline outline-gray-200 hover:cursor-default': isSelected,
    }"
    v-if="!ship.placed"
  >
    <div class="h-full w-full flex justify-between">
      <img
        :src="imageUrl"
        :alt="`${ship.name} of length ${ship.length}`"
        class="m-2 rounded-md overflow-hidden"
      />
      <a
        @click="emit('rotateShip')"
        class="flex items-center p-2 hover:cursor-pointer"
      >
        <img src="../assets/refresh-cw.svg" alt="Rotate" class="h-5" />
      </a>
    </div>
    <h4 class="font-mono">{{ ship.name }}</h4>
  </li>
</template>

<script setup lang="ts">
import { AvailableShip } from "../types";

const props = defineProps<{ ship: AvailableShip; isSelected: boolean }>();
const emit = defineEmits<{
  (e: "rotateShip"): void;
}>();

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
