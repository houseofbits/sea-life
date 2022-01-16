<script setup lang="ts">
import {ref} from "vue";
import PuzzlePieces from "@src/helpers/PuzzlePieces";
import {useRouter} from "vue-router";
import Puzzle from "@src/components/Puzzle.vue";

const roter = useRouter();

const viewToggle = ref(true);

function back(): void {
  roter.push('/game');
}

</script>
<template>
  <div class="content-1080p detail-list">
    <div class="header">
      <img src="@images/logo.svg" alt="" width="64">
      <div class="header-title">
        <span>
          Saliec Mencu
        </span>
      </div>
      <div class="languages flex">

      </div>
    </div>

    <div class="view-toggle" @click="viewToggle=!viewToggle" :class="{toggle: viewToggle}">
      <div class="text">
        <span>Ārējā uzbūve</span>
        <span>Iekšējā uzbūve</span>
      </div>
      <div class="line">
        <div></div>
      </div>
    </div>

    <div class="back-filter" @click="back">
      <img src="@images/arrow-left.svg" alt="">
      <span>Atpakaļ</span>
    </div>

    <img class="bones-image" alt="" src="/images/Skelets.png"/>

    <puzzle :pieces="PuzzlePieces"/>

  </div>
</template>