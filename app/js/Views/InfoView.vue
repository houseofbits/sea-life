<template>
    <div class="screen">
        <div class="grid grid-flow-col auto-cols-max">
            <div v-for="(val, key) in languages" :class="{'btn-active': isLanguageSelected(key)}"
                 class="btn btn-blue m-1 cursor-pointer text-center"
                 @click="selectLanguage(key)">{{ val }}
            </div>
        </div>

        <info-overview v-if="!selectedPage" v-model="selectedPage"/>
        <info-detail-view v-if="selectedPage" :content="content" @close="this.closeDetailsView"/>
    </div>
</template>

<script>
import HttpService from "@js/Services/HttpService";
import InfoOverview from "@js/Components/InfoOverview.vue";
import InfoDetailView from "@js/Components/InfoDetailView.vue";
import _ from 'lodash';

export default {
    name: "InfoView",
    components: {InfoDetailView, InfoOverview},
    data() {
        return {
            selectedPage: null,
            selectedLanguage: 'lv',
            content: null,
            languages: {
                lv: 'LV',
                en: 'EN',
                ru: 'RU',
                de: 'DE',
            }
        };
    },
    watch: {
        selectedPage(val) {
            if (!_.isNull(val)) {
                this.selectedPage = val;
                this.loadContent();
            }
        }
    },
    methods: {
        isLanguageSelected(lang) {
            return this.selectedLanguage === lang;
        },
        selectLanguage(language) {
            this.selectedLanguage = language;
            if (this.selectedPage) {
                this.loadContent();
            }
        },
        getLocalizedContentUrl(id, lang) {
            return '/content/' + lang + '/' + String(id).padStart(2, '0') + '.html';
        },
        loadContent() {
            const url = this.getLocalizedContentUrl(this.selectedPage, this.selectedLanguage);
            HttpService.get(url).then(result => {
                this.content = result.data;
            });
        },
        closeDetailsView() {
            this.content = null;
            this.selectedPage = null;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>