<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";

import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailTranslations from "@src/composables/DetailTranslations";
import {onMounted} from "vue";
import DetailPagination from "@src/composables/DetailPagination";
import DetailViewService from "@src/services/DetailViewService";

const {
  isItemSelected,
  selectItem,
  closeItem,
  listItems,
  selectedItem,
  selectListItems
} = InfoItemsListComposable();

const {
  initLanguages,
  languages,
  selectedLanguage,
  commonTexts,
  isLanguageSelected,
  selectLanguage
} = DetailTranslations();

const {
  selectedPage,
  nextPage,
  prevPage,
  hasNextPage,
  hasPrevPage,
} = DetailPagination();

onMounted(() => {
  DetailViewService.fetchAll().then(() => {
    initLanguages();
    selectListItems(selectedLanguage.value);
  });
});

</script>

<template>

  <div class="content-1080p detail-list">

    <div class="header">
      <img src="@images/logo.svg" alt="">
      <span v-if="!selectedItem" class="text-5xl">{{ commonTexts.title }}</span>
      <span v-if="!selectedItem" class="text-1xl">Putni Zivis Vēžveidīgie Gliemji</span>
      <span v-if="selectedItem" class="text-4xl">{{ selectedItem.title }}</span>
      <div class="flex">
        <div v-for="(val, key) in languages" :class="{'btn-active': isLanguageSelected(key)}"
             class="btn btn-blue m-1 cursor-pointer text-center"
             @click="selectLanguage(key)">{{ val }}
        </div>
      </div>
    </div>

    <div
        v-for="(batch, index) in listItems"
        class="slider-container"
        :class="{active: index===selectedPage, previous: index<selectedPage}"
    >

      <info-item
          v-for="item in batch"
          :item="item"
          :is-selected="isItemSelected(item)"
          @select="selectItem"
          @close="closeItem"
      />

    </div>

    <div class="arrow-r" @click="nextPage(listItems.length)" v-if="hasNextPage(listItems.length)">
      <img src="@images/chevron-right.svg" alt="">
    </div>
    <div class="arrow-l" @click="prevPage" v-if="hasPrevPage">
      <img src="@images/chevron-left.svg" alt="">
    </div>

    <ul class="footer">
      <li
          v-for="(n, index) in listItems.length"
          :class="{active:index===selectedPage}"
          @click="selectedPage=index"
      ></li>
    </ul>

  </div>

</template>