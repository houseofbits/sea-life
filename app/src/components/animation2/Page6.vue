<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const mainVideo = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);

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
      setTimeout(() => active1.value = true, 1000);
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
      <source src="/video/stagars/6_Tuksa_Ala_Tevini_Dejo_1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div class="text-collapse-horizontal page1-text1" :class="{active: active1}">
    <div>Kad <strong>mazuļi</strong> ir paaugušies un <strong>devušies prom</strong> no ligzdas, tēviņš <strong>atsāk</strong> mātīšu <strong>pievilināšanu</strong>.</div>
  </div>

  <div class="page-navigation-link horizontal right" @click="emit('restart', true)">
    <span>Beigas</span>
    <img src="@images/chevron-right.svg" alt="">
  </div>

</template>