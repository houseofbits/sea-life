<script setup lang="ts">
import Page1Main from "@src/components/animation1/Page1Main.vue";
import Page1Info from "@src/components/animation1/Page1Info.vue";
import {ref, watch} from "vue";

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const activeView = ref<number | null>(null);
const previousView = ref<number | null>(null);

function mainViewSliderClass(): string {
  if (activeView.value == 0) {
    return 'in-down';
  }
  if (activeView.value !== 0 && previousView.value !== activeView.value) {
    return 'out-up'
  }
  return '';
}

function infoViewSliderClass(): string {
  if (activeView.value == 1) {
    return 'in-up';
  }
  if (activeView.value !== 1 && previousView.value !== activeView.value) {
    return 'out-down'
  }
  return '';
}

function showInfo(): void {
  activeView.value = 1;
  previousView.value = 0;
}

function showMain(): void {
  activeView.value = 0;
  previousView.value = 1;
}

function restart(): void {
  activeView.value = 0;
  emit('restart');
}

watch(() => props.isActive, (active) => {
  if (active) {
    activeView.value = null;
    previousView.value = null;
  }
});

</script>
<template>

  <div class="full-slider-container" :class="mainViewSliderClass()">
    <page1-main :is-active="props.isActive && activeView === 0" @info="showInfo" @next="emit('next')"/>
  </div>
  <div class="full-slider-container initial-bottom" :class="infoViewSliderClass()">
    <page1-info :is-active="props.isActive && activeView === 1" @main="showMain" @next="emit('next')"/>
  </div>

</template>