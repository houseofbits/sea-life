<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page1 from "@src/components/animation1/Page1.vue";
import Page2 from "@src/components/animation1/Page2.vue";
import Page3 from "@src/components/animation1/Page3.vue";
import Page4 from "@src/components/animation1/Page4.vue";
import Page5 from "@src/components/animation1/Page5.vue";
import NumericPagination from "@src/composables/NumericPagination";

const router = useRouter();

const pageComponents = [
  Page1,
  Page2,
  Page3,
  Page4,
  Page5
];

const {getAnimationState, isSelectedPage, selectNextPage, selectPrevPage, selectPage} = NumericPagination();

function back(): void {
  router.push('/game');

}

function navigateToPuzzle(): void {
  router.push('/game/puzzle');

}

function navigateToAnimation2(): void {
  router.push('/game/anim2');

}

</script>
<template>
  <div class="content-1080p">
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
                 @restart="selectPage(0)"/>
    </div>

  </div>
</template>
