<template>
  <div
    class="square"
    :class="{ is_ship: props.has_ship, is_shot: props.is_shot }"
    @click="shoot"
  >
    {{ props.has_ship ? 1 : 0 }}|{{ props.is_shot ? 1 : 0 }}
  </div>
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
  border: 1px solid black;
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
