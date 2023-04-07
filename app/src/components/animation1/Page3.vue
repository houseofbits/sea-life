<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const page2Video = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);
const active2 = ref(false);
const active3 = ref(false);

function stopVideo(): void {
  if (page2Video.value) {
    page2Video.value.pause();
    page2Video.value.currentTime = 0;
  }
}

watch(() => props.isActive, (value: boolean) => {
  if (page2Video.value) {
    if (value) {
      page2Video.value.play();
    } else {
      stopVideo();
    }
  }
});

function nextPage(): void {
  stopVideo();
  emit('next');
}

function prevPage(): void {
  stopVideo();
  emit('prev');
}

watch(() => props.isActive, (active) => {
  setTimeout(() => {
    active1.value = true
    setTimeout(() => {
      active2.value = true
      setTimeout(() => {
        active3.value = true
      }, 8000);
    }, 4000);
  }, 1000);
});

</script>
<template>
  <div class="anim1-page-bg">
    <img src="@images/anim1-page2-bg.svg" alt="">

    <div class="video page2-video">
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
    <div class="vertical-bullet-points">
      <div class="ball" :class="{active: active1}">
        <div></div>
      </div>
      <div class="second" :class="{active: active2}">
        <div class="line"></div>
        <div class="ball">
          <div></div>
        </div>
      </div>
      <div class=" third" :class="{active: active3}">
        <div class="line"></div>
        <div class="ball">
          <div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="anim1-page2-text">
    <div class="text-collapse text-1" :class="{active: active1}">
      <div>
        Lai rastos jaunās zivis, jasatiekas <strong>zivju mammai</strong> ar <strong>zivju tēti</strong>
      </div>
    </div>
    <div class="text-collapse text-2" :class="{active: active2}">
      <div>
        Izvēlētajā vietā zivju mamma <strong>iznērš ikrus</strong>, bet tētis tiem <strong>pievieno pieņus</strong>
      </div>
    </div>
    <div class="text-collapse text-3" :class="{active: active3}">
      <div>
        Šūnām apvienojoties, apaugļotajos <strong>ikros</strong> sākas jauno <strong>zivtiņu attīstība.</strong>
      </div>
    </div>
  </div>

  <div class="page-navigation-link horizontal right" @click="nextPage">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" alt="" :class="{'bounce-right-anim': active3}">
  </div>

  <div class="page-navigation-link horizontal left" @click="prevPage">
    <img src="@images/chevron-left.svg" alt="">
    <span>Atpakaļ</span>
  </div>

  <div class="back-filter" @click="emit('restart')">
    <img src="@images/arrow-left.svg" alt="">
    <span>Uz sākumu</span>
  </div>

</template>