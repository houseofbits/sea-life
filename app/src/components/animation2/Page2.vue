<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['next', 'prev']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const mainVideo = ref<HTMLMediaElement | null>(null);

function stopVideo(): void {
  if (mainVideo.value) {
    mainVideo.value.pause();
    mainVideo.value.currentTime = 0;
  }
}

watch(() => props.isActive, (value: boolean) => {
  if (mainVideo.value) {
    if (value) {
      mainVideo.value.play();
    } else {
      stopVideo();
    }
  }
});

function prevPage(): void {
  emit('prev');
}

</script>
<template>
  <div class="content-1080p">
    <video width="1920" height="1080" muted loop ref="mainVideo">
      <source src="/video/stagars/2_Kautins_Ar_Teviniem.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>




  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
  </div>

  <div class="page-navigation-link horizontal left" @click="prevPage">
    <img src="@images/chevron-left.svg" alt="">
    <span>Atpakaļ</span>
  </div>

</template>