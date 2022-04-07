<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import NavigationBar from "@src/components/NavigationBar.vue";
import NumericPagination from "@src/composables/NumericPagination";
import PuzzleSkeleton from "@src/components/puzzle/PuzzleSkeleton.vue";
import PuzzleInnerParts from "@src/components/puzzle/PuzzleInnerParts.vue";
import PuzzleOuterParts from "@src/components/puzzle/PuzzleOuterParts.vue";

const router = useRouter();

const pageComponents = [
  PuzzleSkeleton,
  PuzzleInnerParts,
  PuzzleOuterParts
];

const {getAnimationState, selectPage, selectNextPage, selectPrevPage, isSelectedPage, currentPage} = NumericPagination();

const key = ref(0);

function restart(): void {
  navigateToStep(0);
  key.value++;
}

function navigateToMain(): void {
  router.push('/game');
}

function navigateToAnimation1(): void {
  router.push('/game/anim1');
}

function navigateToAnimation2(): void {
  router.push('/game/anim2');
}

function navigateToStep(step: number): void {
  selectPage(step);
}

</script>
<template>
  <div class="content-1080p puzzle-view">

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

    <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">
      <img src="@images/arrow-left.svg" alt="">
      <span>Izvēlne</span>
    </div>
    <div v-else class="back-filter" @click="restart">
      <img src="@images/arrow-left.svg" alt="">
      <span>Uz sākumu</span>
    </div>

    <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container initial-right "
         :class="[getAnimationState(index)]">
      <component :key="index + '-' + key" :is="component" :is-active="isSelectedPage(index)" @next="selectNextPage" @prev="selectPrevPage"/>
    </div>

    <div class="progress-indicator">
      <div class="step" :class="{active: isSelectedPage(0)}" @click="() => navigateToStep(0)">
        <div><span>1</span></div>
        <span class="name">Skelets</span>
      </div>
      <div class="divider"></div>
      <div class="step" :class="{active: isSelectedPage(1)}" @click="() => navigateToStep(1)">
        <div><span>2</span></div>
        <span class="name">Iekšējā uzbūve</span>
      </div>
      <div class="divider"></div>
      <div class="step" :class="{active: isSelectedPage(2)}" @click="() => navigateToStep(2)">
        <div><span>3</span></div>
        <span class="name">Ārējā uzbūve</span>
      </div>
    </div>

  </div>
</template>