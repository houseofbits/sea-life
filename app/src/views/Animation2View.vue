<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page1 from "@src/components/animation2/Page1.vue";
import Page2 from "@src/components/animation2/Page2.vue";
import NumericPagination from "@src/composables/NumericPagination";

const router = useRouter();

const pageComponents = [
  Page1,
  Page2
];

const {
  getAnimationState,
  isSelectedPage,
  selectNextPage,
  selectPrevPage,
  selectPage,
  currentPage
} = NumericPagination();

function back(): void {
  router.push('/game');
}

function navigateToPuzzle(): void {
  router.push('/game/puzzle');
}

function navigateToAnimation1(): void {
  router.push('/game/anim1');
}

function navigateToMain(): void {
  router.push('/game');
}

</script>
<template>
  <div class="content-1080p bg-white">
    <navigation-bar>
      <span>Stagara riests</span>
      <template #links>
        <span class="group-links">
          <a href="#" @click="navigateToPuzzle">Saliec mencu</a>
          <a href="#" @click="navigateToAnimation1">Attīstība</a>
          <a href="#" class="active">Stagara riests</a>
        </span>
      </template>
    </navigation-bar>

    <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container initial-right"
         :class="[getAnimationState(index)]">
      <component :is="component" :is-active="isSelectedPage(index)" @next="selectNextPage" @prev="selectPrevPage"/>
    </div>

    <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">
      <img src="@images/arrow-left.svg" alt="">
      <span>Izvēlne</span>
    </div>
    <div v-else class="back-filter" @click="selectPage(0)">
      <img src="@images/arrow-left.svg" alt="">
      <span>Uz sākumu</span>
    </div>
  </div>
</template>
