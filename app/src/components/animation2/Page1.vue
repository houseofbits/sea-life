<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

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

onMounted(() => {
  if (mainVideo.value) {
    mainVideo.value.play();
  }
});

</script>
<template>
  <div class="content-1080p">
    <video width="1920" height="1080" muted loop ref="mainVideo">
      <source src="/video/stagars/1_Paliek_Kosaks.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div>
    Trīsadatu stagars ir sīka zivtiņa, kas Latvijā sastopama gan saldūdeņos, gan jūrā.
  </div>



  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg"  class="bounce-right-anim" alt="">
  </div>

</template>