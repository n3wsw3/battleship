<template>
  <div
    class="square hover:cursor-pointer border border-black align-top z-10"
    :class="{
      'bg-gray-600': !props.is_shot && props.has_ship,
      'bg-blue-500': props.is_shot,
      'bg-red-500': props.has_ship && props.is_shot,
    }"
    @click="shoot"
  ></div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ is_shot: boolean; has_ship: boolean }>(),
  {
    is_shot: false,
    has_ship: false,
  }
);

const emit = defineEmits<{
  (e: "shoot"): void;
}>();

const shoot = () => {
  if (props.is_shot) return;
  emit("shoot");
};
</script>

<style>
.square {
  display: inline-block;
  width: var(--size);
  text-align: center;
  user-select: none;
  aspect-ratio: 1;
}

.square.is_ship {
  background-color: #5f5f5f;
}

.square.is_shot {
  background-color: #5ee6fd;
}

.square.is_shot.is_ship {
  background-color: #ff7171;
}
</style>
