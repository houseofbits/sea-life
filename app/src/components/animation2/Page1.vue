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
const active2 = ref(false);
const continueBounce = ref(false);

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
    setTimeout(() => active1.value = true, 1000);
    setTimeout(() => active2.value = true, 8000);
    setTimeout(() => continueBounce.value = true, 10000);
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

  <div class="text-collapse-horizontal page1-text1" :class="{active: active1}">
    <div>Trīsadatu <strong>stagars ir neliela zivtiņa</strong>, kas Latvijā sastopama gan saldūdeņos, gan jūrā.</div>
  </div>

  <div class="text-collapse-horizontal page1-text2" :class="{active: active2}">
    <div><strong>Tuvojoties riesta laikam</strong> vairāku sugu <strong>zivis maina krāsu</strong>,  tai skaitā stagaru tēviņi. Tiem iekrāsojas gaiši zilas acis, koši sarkans vēders un zila mugura.</div>
  </div>

  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg"  :class="{'bounce-right-anim':continueBounce}" alt="">
  </div>

</template>