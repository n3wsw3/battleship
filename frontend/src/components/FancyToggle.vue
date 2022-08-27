<template>
  <div class="w-full bg-gray-100 rounded-lg p-1">
    <div class="flex">
      <div
        v-for="option in options"
        :key="option"
        class="rounded-md flex-1"
        :class="modelValue === option ? 'bg-white shadow-sm' : ''"
        style="transition: all 200ms ease-in-out"
      >
        <input
          :id="option"
          type="radio"
          :value="option"
          v-model="value"
          class="hidden"
        />
        <label
          :for="option"
          class="p-2 text-center block w-full capitalize"
          :class="modelValue === option ? '' : 'cursor-pointer'"
          >{{ option }}</label
        >
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
