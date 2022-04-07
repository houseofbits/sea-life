<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const emit = defineEmits(['info', 'next']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});
const mainVideo = ref<HTMLMediaElement | null>(null);

const callout1Active = ref(false);
const callout2Active = ref(false);
const callout3Active = ref(false);

watch(() => props.isActive, (value: boolean) => {
  if (mainVideo.value) {
    if (value) {
      mainVideo.value.play();
    } else {
      mainVideo.value.pause();
    }
  }
});

onMounted(() => {
  if (mainVideo.value) {
    mainVideo.value.play();
  }

  setTimeout(() => {
    callout1Active.value = true;

    setTimeout(() => {
      callout2Active.value = true;

      setTimeout(() => {
        callout3Active.value = true;
      }, 500);
    }, 500);
  }, 500);
});

</script>
<template>

  <div class="video-1">
    <div class="globe-border"></div>
    <video width="1016" height="1019" muted loop ref="mainVideo">
      <source src="/video/Globuss.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div class="ball-callout page1-callout1" :class="{active: callout1Active}">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>

    <div class="content">
      <div class="fraction">
        <span>1</span>
        <span>4</span>
      </div>
      <div class="text">
        <span>Pasaulē dzīvo aptuveni</span>
        <span>MILJONA</span>
        <span>dažādu zivju sugu</span>
      </div>
    </div>
  </div>

  <div class="ball-callout page1-callout2" :class="{active: callout2Active}">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>

    <div class="content">
      Tās izšķiļas no ikriem, <span class="link">aug un attīstās</span>, līdz kļūst pieaugušas.
    </div>
  </div>

  <div class="ball-callout page1-callout3" :class="{active: callout3Active}">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>

    <div class="content">
      Tad tās ir <span class="link">gatavas laist pasaulē pēcnācējus</span> un dzīves cikls var turpināties.
    </div>
  </div>

  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
  </div>

</template>