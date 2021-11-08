<template>
    <div class="screen">
        <info-overview  v-if="!content" v-model="selectedPage"/>
        <info-detail-view v-if="content" :content="content" @close="this.closeDetailsView"/>
    </div>
</template>

<script>
import HttpService from "@js/Services/HttpService.js";
import InfoOverview from "@js/Components/InfoOverview.vue";
import InfoDetailView from "@js/Components/InfoDetailView.vue";
import _ from 'lodash';
import ContentLV from '@js/Helpers/ContentLV.js';

export default {
    name: "InfoView",
    components: {InfoDetailView, InfoOverview},
    data() {
        return {
            selectedPage: null,
            selectedLanguage: 'lv',
            content: null
        };
    },
    watch: {
        selectedPage(val) {
            if (!_.isNull(val)) {
                this.loadContent(val);
            }
        }
    },
    methods: {
        loadContent(id) {
            const url = ContentLV[id-1];
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