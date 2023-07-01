<script setup lang="ts">
import {onMounted, ref} from "vue";
import TimeoutService from "@src/services/TimeoutService";
import {useRouter} from "vue-router";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";
import DetailTranslations from "@src/composables/DetailTranslations";

const router = useRouter();

const {
    detailContent
} = DetailList();

const {
    setTranslations,
    setLanguages,
    selectLanguage
} = DetailTranslations();

const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(() => {

    isLoading.value = true;

    DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
        detailContent.value = result;
        setLanguages(detailContent.value.config.languages);
        selectLanguage(detailContent.value.config.languages[0]);
        setTranslations(detailContent.value.translatedCommon);
    }).catch(e => {
        errorMessage.value = e.message;
    }).finally(() => {
        isLoading.value = false;
    });

    TimeoutService.registerCallback(() => {
        selectLanguage('lv');
        router.push('/');
    });
});

</script>
<template>
    <router-view v-show="!isLoading"/>
    <div v-if="isLoading" class="content-1080p detail-list detail-list-loading">
        Loading
    </div>
    <div v-if="errorMessage" class="content-1080p detail-list-error bg-white">
        <span>Error while fetching data from the server.</span>
        <span><strong>With message:</strong> {{ errorMessage }}</span>
    </div>
</template>
