<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailTranslations from "@src/composables/DetailTranslations";
import {onMounted} from "vue";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";

const {
  isItemSelected,
  selectItem,
  closeItem,
  selectedItem,
} = InfoItemsListComposable();

const {
  setTranslations,
  setLanguages,
  translations,
  languages,
  selectedLanguage,
  selectLanguage,
  isLanguageSelected,
} = DetailTranslations();

const {
  allPages,
  pages,
  createPageGroupsFromItems,
  selectNextPage,
  selectPrevPage,
  selectGroup,
  hasNextPage,
  hasPrevPage,
  selectPage,
  getAnimationState,
  isActivePage
} = DetailList();

onMounted(() => {
  DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
    setLanguages(result.config.languages);
    selectLanguage(result.config.languages[0]);
    setTranslations(result.translatedCommon);

    createPageGroupsFromItems('lv', result.translatedItems['lv']);
    selectGroup();

  });
});

</script>

<template>

  <div class="content-1080p detail-list">
    <div class="header">
      <img src="@images/logo.svg" alt="">
      <span v-if="!selectedItem" class="text-5xl cursor-pointer" @click="selectGroup(null)">{{
          translations.title
        }}</span>
      <span v-if="!selectedItem" class="text-1xl">
        <a href="#" class="mx-3 text-2xl" @click="selectGroup(1)">Putni</a>
        <a href="#" class="mx-3 text-2xl" @click="selectGroup(2)">Zivis</a>
        <a href="#" class="mx-3 text-2xl" @click="selectGroup(3)">Vēžveidīgie</a>
        <a href="#" class="mx-3 text-2xl" @click="selectGroup(4)">Gliemji</a>
      </span>
      <span v-if="selectedItem" class="text-4xl">{{ selectedItem.title }}</span>
      <div class="flex">
        <div v-for="(val, key) in languages" :class="{'btn-active': isLanguageSelected(key)}"
             class="btn btn-blue m-1 cursor-pointer text-center"
             @click="selectLanguage(key)">{{ val }}
        </div>
      </div>
    </div>

    <div
        v-for="page in allPages"
        :key="page.id"
        class="slider-container"
        :class="[getAnimationState(page)]"
    >

      <info-item
          v-for="item in page.items"
          :key="item.id"
          :item="item"
          :is-selected="isItemSelected(item)"
          @select="selectItem"
          @close="closeItem"
      />

    </div>

    <div class="arrow-r" v-if="hasNextPage" @click="selectNextPage">
      <img src="@images/chevron-right.svg" alt="">
    </div>
    <div class="arrow-l" v-if="hasPrevPage" @click="selectPrevPage">
      <img src="@images/chevron-left.svg" alt="">
    </div>

    <ul class="footer" v-if="pages.length > 1">
      <li
          v-for="page in pages"
          :key="'ul-' + page.id"
          :class="{active: isActivePage(page)}"
          @click="selectPage(page)"
      ></li>

    </ul>

  </div>

</template>