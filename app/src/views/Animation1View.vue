<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page3 from "@src/components/animation1/Page3.vue";
import Page4 from "@src/components/animation1/Page4.vue";
import Page5 from "@src/components/animation1/Page5.vue";
import Page6 from "@src/components/animation1/Page6.vue";
import Page1 from "@src/components/animation1/Page1.vue";
import Page2 from "@src/components/animation1/Page2.vue";

import NumericPagination from "@src/composables/NumericPagination";

const router = useRouter();

const pageComponents = [
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6
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

function navigateToAnimation2(): void {
  router.push('/game/anim2');

}

function navigateToMain(): void {
  router.push('/game');
}

function restart(exit: boolean = false) {
  if (exit) {
    navigateToMain();
  } else {
    selectPage(0);
  }
}

</script>
<template>
  <div class="content-1080p bg-white">
    <navigation-bar>
      <span>Attīstība</span>
      <template #links>
        <span class="group-links">
          <a href="#" @click="navigateToPuzzle">Saliec mencu</a>
          <a href="#" class="active">Attīstība</a>
          <a href="#" @click="navigateToAnimation2">Stagara riests</a>
        </span>
      </template>
    </navigation-bar>

    <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container initial-right"
         :class="[getAnimationState(index)]">
      <component :is="component" :is-active="isSelectedPage(index)" @next="selectNextPage" @prev="selectPrevPage"
                 @restart="restart"/>
    </div>

    <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">
      <img src="@images/arrow-left.svg" alt="">
      <span>Izvēlne</span>
    </div>

  </div>
</template>
