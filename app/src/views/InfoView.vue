<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailTranslations from "@src/composables/DetailTranslations";
import {computed, onMounted} from "vue";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";
import TimeoutService from "@src/services/TimeoutService";
import InputHandlerService from "@src/services/InputHandlerService";
import DetailListPageStructure from "@src/structures/DetailListPageStructure";
import {ref} from "vue";
import NavigationBar from "@src/components/NavigationBar.vue";
import NavigationModal from "@src/components/info/NavigationModal.vue";
import DetailListItem from "@src/structures/DetailListItem";

const {
  isItemSelected,
  selectItem,
  closeItem,
  selectedItemId,
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

const isPanning = ref(false);
const panOffset = ref(0);
const isMapModalOpen = ref(false);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);
const allItems = ref<Array<DetailListItem>>([]);

function getPageStyle(page: DetailListPageStructure): any {
  // if (isActivePage(page) && isPanning.value) {
  //     return {
  //       marginLeft: panOffset.value + 'px'
  //     };
  // }
  return {};
}

function openMapModal(): void {
  isMapModalOpen.value = true;
}

function closeMapModal(): void {
  isMapModalOpen.value = false;
}

onMounted(() => {
  DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
    allItems.value = result.items;
    setLanguages(result.config.languages);
    selectLanguage(result.config.languages[0]);
    setTranslations(result.translatedCommon);
    createPageGroupsFromItems(result.items);
    selectGroup();
  }).catch(e => {
    errorMessage.value = e.message;
  }).finally(() => {
    isLoading.value = false;
  });

  TimeoutService.registerCallback(() => {
    closeItem();
    selectLanguage(languages.value[0]);
    selectGroup(null);
    selectPage(pages.value[0]);
  });

  const input = new InputHandlerService(document.querySelector('.detail-list'));
  input.onSwipeLeft(() => {
    if (!selectedItemId.value) {
      selectPrevPage();
    }
  });
  input.onSwipeRight(() => {
    if (!selectedItemId.value) {
      selectNextPage();
    }
  });
  input.onSelectItem(selectItem);

  // input.onPan((e: any) => {
  //   if (e.isFinal) {
  //     isPanning.value = false;
  //     panOffset.value = 0;
  //   } else {
  //     isPanning.value = true;
  //     panOffset.value = e.deltaX;
  //
  //     console.log(e);
  //   }
  // });

});

const itemTitle = computed<string>(() => {
  for (const page of pages.value) {
    const item = page.items.find(elem => elem.id == selectedItemId.value) || null;
    if (item) {
      return item.getTranslatedItem(selectedLanguage.value).title;
    }
  }
  return '';
});

const itemLatinTitle = computed<string>(() => {
  for (const page of pages.value) {
    const item = page.items.find(elem => elem.id == selectedItemId.value) || null;
    if (item) {
      return item.getTranslatedItem(selectedLanguage.value).latinTitle;
    }
  }
  return '';
});

function selectItemFromModal(itemId: number): void {

  const page = allPages.value.find(page => {
    return page.group === null && !!page.items.find(item => item.id === itemId);
  });
  if (page) {
    selectPage(page);
  }
  closeItem();
  isMapModalOpen.value = false;
  setTimeout(() => selectItem(itemId), 500);
}

</script>

<template>
  <div v-show="!isLoading" class="content-1080p detail-list">

    <navigation-bar :languages="languages" @selectLanguage="selectLanguage">

      <span v-if="!selectedItemId" @click="selectGroup(null)">
        {{ translations.title }}
      </span>
      <span v-else>
        {{ itemTitle }}
        <span class="latin-title" v-html="itemLatinTitle"></span>
      </span>

      <template #links v-if="!selectedItemId">
        <span class="group-links">
          <a href="#" v-for="group in translations.groups" @click="selectGroup(group.group)"
             :class="{active: isActiveGroup(group.group)}">
            {{ group.title }}
          </a>
        </span>
      </template>

    </navigation-bar>

    <div
        v-for="page in allPages"
        :key="page.id"
        class="full-slider-container cards-container initial-right"
        :class="[getAnimationState(page)]"
        :style="getPageStyle(page)"
    >

      <info-item
          v-for="item in page.items"
          v-if="getAnimationState(page)"
          :key="page.id + '-' + item.id"
          :item="item.getTranslatedItem(selectedLanguage)"
          :is-selected="isItemSelected(item)"
          @close="closeItem"
          @map="openMapModal"
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
         v-if="!selectedItemId && !isActiveGroup(null)">
      <img src="@images/arrow-left.svg" alt="">
      <span>{{ translations.mainFilterButton }}</span>
    </div>

    <navigation-modal
        v-if="isMapModalOpen"
        :selected-item-id="parseInt(selectedItemId)"
        :items="allItems"
        @close="closeMapModal"
        @select="selectItemFromModal"
    />

    <div class="map-button info-map" @click="openMapModal">
      <img src="@images/map.svg" alt="">
      <span>{{ translations.map }}</span>
    </div>

  </div>
  <div v-if="isLoading" class="content-1080p detail-list detail-list-loading">
    Loading
  </div>
  <div v-if="errorMessage" class="content-1080p detail-list-error">
    <span>Error while fetching data from the server.</span>
    <span><strong>With message:</strong> {{ errorMessage }}</span>
  </div>

</template>