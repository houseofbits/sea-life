<script setup lang="ts">
import PuzzlePieces from "@src/helpers/PuzzlePieces";
import {useRouter} from "vue-router";
import Puzzle from "@src/components/Puzzle.vue";
import NavigationBar from "@src/components/NavigationBar.vue";
import NumericPagination from "@src/composables/NumericPagination";

const router = useRouter();

function back(): void {
  router.push('/game');
}

function navigateToAnimation1(): void {
  router.push('/game/anim1');
}

function navigateToAnimation2(): void {
  router.push('/game/anim2');
}

const {getAnimationState} = NumericPagination();

</script>
<template>
  <div class="content-1080p detail-list">

    <navigation-bar>
      <span>Saliec mencu</span>
      <template #links>
        <span class="group-links">
          <a href="#" class="active">Saliec mencu</a>
          <a href="#" @click="navigateToAnimation1">Attīstība</a>
          <a href="#" @click="navigateToAnimation2">Stagara riests</a>
        </span>
      </template>
    </navigation-bar>

    <div class="back-filter" @click="back">
      <img src="@images/arrow-left.svg" alt="">
      <span>Atpakaļ</span>
    </div>

    <div class="full-slider-container" :class="[getAnimationState(0)]">

      <img class="bones-image" alt="" src="/images/Skelets.png"/>
      <puzzle :pieces="PuzzlePieces"/>

    </div>


  </div>
</template>