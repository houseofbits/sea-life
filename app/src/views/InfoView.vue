<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";

import InfoItemsListComposable from "@src/composables/InfoItemsList";

const {
  isItemSelected,
  selectItem,
  closeItem,
  prevPage,
  nextPage,
  selectLanguage,
  isLanguageSelected,
  listItems,
  languages,
  selectedPage,
  selectedItem
} = InfoItemsListComposable();

</script>

<template>

  <div class="content-1080p detail-list">

    <div class="header">
      <img src="logo">
      <span v-if="!selectedItem" class="text-5xl">Baltijas jūras iemītnieki</span>
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

    <div class="arrow-r" @click="nextPage"></div>
    <div class="arrow-l" @click="prevPage"></div>

    <ul class="footer">
      <li
          v-for="(n, index) in listItems.length"
          :class="{active:index===selectedPage}"
          @click="selectedPage=index"
      ></li>
    </ul>

  </div>

</template>