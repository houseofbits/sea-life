<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailTranslations from "@src/composables/DetailTranslations";
import {onMounted} from "vue";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";
import TimeoutService from "@src/services/TimeoutService";

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
  isActivePage,
  isActiveGroup
} = DetailList();

onMounted(() => {
  DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
    setLanguages(result.config.languages);
    selectLanguage(result.config.languages[0]);
    setTranslations(result.translatedCommon);
    createPageGroupsFromItems(result.items);
    selectGroup();
  });

  TimeoutService.registerCallback(() => {
    closeItem();
    selectLanguage(languages.value[0]);
    selectGroup(null);
    selectPage(pages.value[0]);
  });

});

</script>

<template>

  <div class="content-1080p detail-list">

    <div class="header">
      <img src="@images/logo.svg" alt="" width="64">
      <div class="header-title">
        <span v-if="!selectedItem" @click="selectGroup(null)">
          {{ translations.title  }}
        </span>
        <span v-else>
        {{ selectedItem.title }}
      </span>
      </div>
      <span v-if="!selectedItem" class="group-links">
        <a href="#" v-for="group in translations.groups" @click="selectGroup(group.group)" :class="{active: isActiveGroup(group.group)}">
          {{ group.title }}
        </a>
      </span>
      <div class="languages flex">
        <img v-for="language in languages" :src="'/images/flag-' + language + '.svg'" :alt="language" @click="selectLanguage(language)">
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
          :item="item.getTranslatedItem(selectedLanguage)"
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

    <div class="back-filter"
         @click="selectGroup(null)"
         v-if="!selectedItem && !isActiveGroup(null)">
      <img src="@images/arrow-left.svg" alt="">
      <span>{{ translations.mainFilterButton}}</span>
    </div>

  </div>

</template>