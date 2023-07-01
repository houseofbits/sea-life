<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page1 from "@src/components/animation2/Page1.vue";
import Page2 from "@src/components/animation2/Page2.vue";
import Page3 from "@src/components/animation2/Page3.vue";
import Page4 from "@src/components/animation2/Page4.vue";
import Page5 from "@src/components/animation2/Page5.vue";
import Page6 from "@src/components/animation2/Page6.vue";
import NumericPagination from "@src/composables/NumericPagination";
import {onMounted} from "vue";
import InputHandlerService from "@src/services/InputHandlerService";
import DetailTranslations from "@src/composables/DetailTranslations";

const router = useRouter();
const {lang} = DetailTranslations();

const pageComponents = [
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
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
  router.push('/');
}

function navigateToPuzzle(): void {
  router.push('/puzzle');
}

function navigateToAnimation1(): void {
  router.push('/animation1');
}

function navigateToMain(): void {
  router.push('/');
}

onMounted(() => {
  const input = new InputHandlerService(document.querySelector('.anim2-container'));
  input.onSwipeRight(() => {
    if (currentPage.value < 5) {
      selectNextPage();
    }
  });
  input.onSwipeLeft(() => {
    if (currentPage.value > 0) {
      selectPrevPage();
    }
  });
});

</script>
<template>
  <div class="content-1080p bg-white anim2-container">
    <navigation-bar>
      <span>{{ lang('anim2.title') }}</span>
      <template #links>
        <span class="group-links">
          <a href="#" @click="navigateToPuzzle">{{ lang('puzzle.title') }}</a>
          <a href="#" @click="navigateToAnimation1">{{ lang('anim1.title') }}</a>
          <a href="#" class="active">{{ lang('anim2.title') }}</a>
        </span>
      </template>
    </navigation-bar>

    <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container initial-right"
         :class="[getAnimationState(index)]">
      <component :is="component" :is-active="isSelectedPage(index)" @next="selectNextPage" @prev="selectPrevPage" @restart="navigateToMain"/>
    </div>

    <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">
      <img src="@images/arrow-left.svg" alt="">
      <span>{{ lang('common.back') }}</span>
    </div>

    <div v-if="currentPage!==0" class="back-filter" @click="selectPage(0)">
      <img src="@images/arrow-left.svg" alt="">
      <span>{{ lang('common.toBeginning') }}</span>
    </div>
  </div>
</template>
