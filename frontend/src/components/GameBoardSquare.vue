<template>
  <div
    class="square"
    :class="{is_ship: props.has_ship, is_shot: props.is_shot}"
    @click="emit('shoot')"
  >
    {{ props.has_ship ? 1 : 0 }}|{{ props.is_shot ? 1 : 0 }}
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{is_shot: boolean; has_ship: boolean}>(),
  {
    is_shot: false,
    has_ship: false,
  }
);

const emit = defineEmits<{
  (e: "shoot"): void;
}>();

</script>

<style>
.square {
  --size: 40px;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
  text-align: center;
  user-select: none;
  border: 1px solid black;
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
