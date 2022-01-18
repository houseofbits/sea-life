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

const {getAnimationState} = NumericPagination();

function back(): void {
  router.push('/game');
}

function navigateToPuzzle(): void {
  router.push('/game/puzzle');
}

function navigateToAnimation1(): void {
  router.push('/game/anim1');
}

</script>
<template>
  <div class="content-1080p">
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

    <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container" :class="[getAnimationState(index)]">
      <component :is="component"/>
    </div>

  </div>
</template>
