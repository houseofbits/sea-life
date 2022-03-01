<script setup lang="ts">
import {ref} from "vue";

const infoVideo1 = ref(null);
const infoVideo2 = ref(null);
const infoVideo3 = ref(null);

const emit = defineEmits(['main', 'next']);

const activeElement = ref<number | null>(null);

function selectElement(id: number): void {
  activeElement.value = id;
}

function getCardClasses(id: number): object {
  const isMinimized = activeElement.value !== null && activeElement.value !== id;
  let mini1 = false, mini2 = false;
  if (isMinimized && activeElement.value !== null) {
    const set = [1, 2, 3];
    set.splice((activeElement.value - 1), 1);
    mini1 = set[0] == id;
    mini2 = set[1] == id;
  }
  return {
    active: activeElement.value === id,
    minimized: isMinimized,
    mini1,
    mini2,
  };
}

function getCalloutClasses(id: number): object {
  return {
    active: activeElement.value === id,
    faded: (activeElement.value !== id)
  };
}

function returnMain(): void {
  emit('main');
}

</script>
<template>

  <div>

    <img class="anim1-info-bg1" :class="{faded: (activeElement !== null)}" src="@images/anim1-info-bg1.svg" alt="">
    <img class="anim1-info-bg1" :class="{faded: (activeElement === null)}" src="@images/anim1-info-bg2.svg" alt="">

    <div
        class="expandable-card card1"
        :class="getCardClasses(1)"
        @click="selectElement(1)">

      <div class="globe-border info"></div>

      <div class="card-video">
        <video muted ref="infoVideo1">
          <source src="/images/Globuss_2.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="card-title">Nārsto jūrā</div>
      <div class="card-subtitle">pastāvīgi dzīvo jūrā – tajā gan nārsto, gan aug un attīstās</div>
    </div>

    <div
        class="expandable-card card2"
        :class="getCardClasses(2)"
        @click="selectElement(2)">

      <div class="globe-border info"></div>

      <div class="card-video">
        <video muted ref="infoVideo2">
          <source src="/images/Globuss_2.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="card-title">Atgriežas upēs</div>
      <div class="card-subtitle">barojas jūrā, bet nārstot dodas uz dzimtajām upēm</div>
    </div>

    <div
        class="expandable-card card3"
        :class="getCardClasses(3)"
        @click="selectElement(3)">

      <div class="globe-border info"></div>

      <div class="card-video">
        <video muted ref="infoVideo3">
          <source src="/images/Globuss_2.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="card-title">Pāri okeānam</div>
      <div class="card-subtitle">Nārstot dodas pāri visam Atlantijas okeānam</div>
    </div>
  </div>

  <div class="ball-callout page2-callout" :class="getCalloutClasses(1)">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="fixed-text">
        <span class="title">Nārsto jūrā</span>
        <span>Ir zivis, kuras <span class="link">pastāvīgi dzīvo jūrā</span> – tajā gan nārsto, gan aug un attīstās, piemēram brētliņa un jūrasgrundulis.</span>
      </div>
    </div>
  </div>

  <div class="ball-callout page2-callout" :class="getCalloutClasses(2)">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="fixed-text">
        <span class="title">Atgriežas upēs</span>
        <span>Dažas zivis, piemēram lasis un vimba, lielāko daļu dzīves pavada un barojas jūrā, bet <span class="link">nārstot dodas uz dzimtajām upēm.</span></span>
      </div>
    </div>
  </div>

  <div class="ball-callout page2-callout" :class="getCalloutClasses(3)">
    <div class="ball">
      <div></div>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="fixed-text">
        <span class="title">Pāri okeānam</span>
        <span>Zuši vairošanās vecumu sasniedz Baltijas jūrā, kā arī ar to savienotajās upēs un ezeros. Savukārt <span
            class="link">nārstot tie dodas uz Sargasu jūru pāri visam Atlantijas okeānam.</span> Izšķīlušies jaunie zuši peld pretējā virzienā un atgriežas savu vecāku apdzīvotajās jūrās un upēs.</span>
      </div>
    </div>
  </div>

  <div class="info-zero-state-title" :class="{faded: activeElement !== null}">Zivju vairošanās – Nārsts</div>

  <div v-if="activeElement" class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" alt="" :class="{'bounce-right-anim': (activeElement !== null)}">
  </div>

  <div class="page-navigation-link vertical top" @click="returnMain">
    <img src="@images/chevron-up.svg" alt="">
    <span>Sākuma skats</span>
  </div>

</template>