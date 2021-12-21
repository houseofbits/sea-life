<script setup lang="ts">
import HttpService from "@js/services/HttpService";
import InfoDetailView from "@js/components/InfoDetailView.vue";
import {ref, onMounted, reactive, watch} from "vue";
import DetailListItem from "@js/structures/DetailListItem";

const state = reactive({
  selectedPage: null,
  selectedLanguage: 'lv',
  content: null,
  languages: {
    lv: 'LV',
    en: 'EN',
    ru: 'RU',
    de: 'DE',
  },
  listItems: [],
});

const listItems = ref<Array<DetailListItem>>([]);

function isLanguageSelected(language: string) {
  return state.selectedLanguage === language;
}

function selectLanguage(language: string) {
  state.selectedLanguage = language;
  fetchListItems();
  // if (state.selectedPage) {
  //   loadContent();
  // }
}
//
// function getLocalizedContentUrl(id: number | null, language: string) {
//   return '/content/' + language + '/' + String(id).padStart(2, '0') + '.html';
// }
//
// function loadContent() {
//   const url = getLocalizedContentUrl(state.selectedPage, state.selectedLanguage);
//   HttpService.get(url).then(result => {
//     state.content = result.data;
//   });
// }

function fetchListItems(): void {
  HttpService.getList().then(items => {
    listItems.value = items;
  });
}

onMounted(() => fetchListItems());

function closeDetailsView() {
  state.content = null;
  state.selectedPage = null;
}

// watch(() => state.selectedPage, (page) => {
//   state.selectedPage = page;
//   if (page) {
//     loadContent();
//   }
// });

</script>

<template>
  <div class="screen">
    <div class="grid grid-flow-col auto-cols-max">
      <div v-for="(val, key) in state.languages" :class="{'btn-active': isLanguageSelected(key)}"
           class="btn btn-blue m-1 cursor-pointer text-center"
           @click="selectLanguage(key)">{{ val }}
      </div>
    </div>

    <div class="container">
      <div class="grid grid-cols-5 gap-4 m-3">
        <div
            v-for="item in listItems"
            :key="item.id"
            class="btn btn-blue m-1 cursor-pointer text-center"
            @click="select(item.id)">
          {{ item.title }}
        </div>
      </div>
    </div>

<!--    <info-detail-view v-if="state.selectedPage" :template="state.content" @close="closeDetailsView"/>-->
  </div>
</template>