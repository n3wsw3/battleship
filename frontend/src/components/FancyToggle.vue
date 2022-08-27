<template>
  <div class="w-full bg-white border border-gray-100 rounded-lg p-1">
    <div class="flex">
      <div
        v-for="option in options"
        :key="option"
        class="p-2 rounded-md flex-1"
        :class="modelValue === option ? 'bg-gray-100' : ''"
      >
        <input
          :id="option"
          type="radio"
          :value="option"
          v-model="value"
          class="hidden"
        />
        <label :for="option" class="text-center block w-full font-mono">{{
          option
        }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: string[];
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log(value);
    emit("update:modelValue", value);
  },
});
</script>
