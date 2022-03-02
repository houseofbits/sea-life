<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['next', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const page2Video = ref<HTMLMediaElement | null>(null);

watch(() => props.isActive, (value: boolean) => {
  if (page2Video.value) {
    if (value) {
      page2Video.value.play();
    } else {
      page2Video.value.pause();
      page2Video.value.currentTime = 0;
    }
  }
});

</script>
<template>
  <div class="anim1-page2-bg">
    <img src="@images/anim1-page2-bg.svg" alt="">

    <div class="page2-video">
      <video muted loop ref="page2Video">
        <source src="/video/Mamma_Tetis.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>

  <div class="anim1-page2-header">
    <span>Kā tad zivis vairojas?</span>
    <strong>Zivju vairošanos sauc par nārstu</strong>
  </div>

  <div class="anim1-page2-details">

  </div>

  <div class="back-filter" @click="emit('restart')">
    <img src="@images/arrow-left.svg" alt="">
    <span>Izvēlne</span>
  </div>

</template>