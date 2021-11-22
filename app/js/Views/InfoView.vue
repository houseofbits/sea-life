<script setup lang="ts">
import HttpService from "@js/Services/HttpService";
import InfoOverview from "@js/Components/InfoOverview.vue";
import InfoDetailView from "@js/Components/InfoDetailView.vue";
import {reactive, watch} from "vue";

const state = reactive({
    selectedPage: null,
    selectedLanguage: 'lv',
    content: null,
    languages: {
        lv: 'LV',
        en: 'EN',
        ru: 'RU',
        de: 'DE',
    }
});

function isLanguageSelected(language: string) {
    return state.selectedLanguage === language;
}

function selectLanguage(language: string) {
    state.selectedLanguage = language;
    if (state.selectedPage) {
        loadContent();
    }
}

function getLocalizedContentUrl(id: number | null, language: string) {
    return '/content/' + language + '/' + String(id).padStart(2, '0') + '.html';
}

function loadContent() {
    const url = getLocalizedContentUrl(state.selectedPage, state.selectedLanguage);
    HttpService.get(url).then(result => {
        state.content = result.data;
    });
}

function closeDetailsView() {
    state.content = null;
    state.selectedPage = null;
}

watch(() => state.selectedPage, (page) => {
    state.selectedPage = page;
    loadContent();
});

</script>

<template>
    <div class="screen">
        <div class="grid grid-flow-col auto-cols-max">
            <div v-for="(val, key) in state.languages" :class="{'btn-active': isLanguageSelected(key)}"
                 class="btn btn-blue m-1 cursor-pointer text-center"
                 @click="selectLanguage(key)">{{ val }}
            </div>
        </div>

        <info-overview v-if="!state.selectedPage" v-model="state.selectedPage"/>
        <info-detail-view v-if="state.selectedPage" v-model="state.content" @close="closeDetailsView"/>
    </div>
</template>