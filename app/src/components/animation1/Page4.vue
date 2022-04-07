<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const activeCard = ref(2);

const page3Video0 = ref<HTMLMediaElement | null>(null);
const page3Video1 = ref<HTMLMediaElement | null>(null);
const page3Video2 = ref<HTMLMediaElement | null>(null);
const page3Video3 = ref<HTMLMediaElement | null>(null);
const page3Video4 = ref<HTMLMediaElement | null>(null);

function stopAllVideos(): void {
  if (page3Video0.value) {
    page3Video0.value.pause();
  }
  if (page3Video1.value) {
    page3Video1.value.pause();
  }
  if (page3Video2.value) {
    page3Video2.value.pause();
  }
  if (page3Video3.value) {
    page3Video3.value.pause();
  }
  if (page3Video4.value) {
    page3Video4.value.pause();
  }
}

function playVideos(id: number): void {
  stopAllVideos();

  if (page3Video0.value && id === 0) {
    page3Video0.value.play();
  }
  if (page3Video1.value && id === 1) {
    page3Video1.value.play();
  }
  if (page3Video2.value && id === 2) {
    page3Video2.value.play();
  }
  if (page3Video3.value && id === 3) {
    page3Video3.value.play();
  }
  if (page3Video4.value && id === 4) {
    page3Video4.value.play();
  }
}

function nextPage(): void {
  stopAllVideos();
  emit('next');
}

function prevPage(): void {
  stopAllVideos();
  emit('prev');
}

function deg2rad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function selectCard(id: number): void {
  activeCard.value = id;
  playVideos(activeCard.value);
}

function nextCard(): void {
  if (activeCard.value < 4) {
    activeCard.value++;
  }
  playVideos(activeCard.value);
}

function prevCard(): void {
  if (activeCard.value > 0) {
    activeCard.value--;
  }
  playVideos(activeCard.value);
}

function cardTransform(id: number): object {

  const relativeIndex = id - activeCard.value;

  const angle = relativeIndex * 20;

  const factorX = Math.sin(deg2rad(angle));
  const factorZ = Math.cos(deg2rad(angle));

  const positionX = factorX * 800;
  const zIndex = Math.floor(factorZ * 100);

  return {
    zIndex,
    transform: ' translate(' + positionX + 'px, 0) scale(' + factorZ + ')',
  };
}

watch(() => props.isActive, (value: boolean) => {
  if (value) {
    playVideos(activeCard.value);
  } else {
    stopAllVideos();
  }
});

</script>
<template>

  <div class="anim1-page2-header">
    <span>Pēc nārsta <strong>ikriņi</strong> dažādām zivīm </span>
    <strong>attīstās dažādās vietās. </strong>
  </div>

  <div class="page3-card" :style="cardTransform(0)" @click="selectCard(0)">
    <div class="video page3-card-video">
      <video muted loop ref="page3Video0">
        <source src="/video/Kartina_4.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="title">Plekstes</div>
    <div class="description">Ikri brīvi peld virs grunts</div>
  </div>

  <div class="page3-card" :style="cardTransform(1)" @click="selectCard(1)">
    <div class="video page3-card-video">
      <video muted loop ref="page3Video1">
        <source src="/video/Kartina_2.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="title">Mencas</div>
    <div class="description">Ikri ir peldoši</div>
  </div>

  <div class="page3-card" :style="cardTransform(2)" @click="selectCard(2)">
    <div class="video page3-card-video">
      <video muted loop ref="page3Video2">
        <source src="/video/Kartina_1.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="title">Lasis</div>
    <div class="description">Ikriņus ierok oļos</div>
  </div>

  <div class="page3-card" :style="cardTransform(3)" @click="selectCard(3)">
    <div class="video page3-card-video">
      <video muted loop ref="page3Video3">
        <source src="/video/Kartina_5.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="title">Vējzivs</div>
    <div class="description">ikriem ir daudz pavedieniņu, ar kuriem tie piestiprinēs pie augiem vai peldošiem
      priekšmetiem.
    </div>
  </div>

  <div class="page3-card" :style="cardTransform(4)" @click="selectCard(4)">
    <div class="video page3-card-video">
      <video muted loop ref="page3Video4">
        <source src="/video/Kartina_3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="title">Reņģes</div>
    <div class="description">Savējos pielipina pie aļģēm</div>
  </div>

  <div class="page3-navigator">
    <img src="@images/chevron-left.svg" alt="" @click="prevCard">
    <img src="@images/chevron-right.svg" alt="" @click="nextCard">
  </div>

  <div class="page-navigation-link horizontal right" @click="nextPage">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" alt="" class="bounce-right-anim">
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