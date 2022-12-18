<script setup lang="ts">
import {onMounted, ref} from "vue";
import TimeoutService from "@src/services/TimeoutService";
import {useRouter} from "vue-router";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";

const router = useRouter();

const {
    detailContent
} = DetailList();

const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(() => {
    if (!detailContent.value) {
        DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
            detailContent.value = result;
        }).catch(e => {
            errorMessage.value = e.message;
        }).finally(() => {
            isLoading.value = false;
        });
    } else {
        isLoading.value = false;
    }

    TimeoutService.registerCallback(() => {
        router.push('/');
    });
});

</script>
<template>
    <router-view v-show="!isLoading" />
    <div v-if="isLoading" class="content-1080p detail-list detail-list-loading">
        Loading
    </div>
    <div v-if="errorMessage" class="content-1080p detail-list-error">
        <span>Error while fetching data from the server.</span>
        <span><strong>With message:</strong> {{ errorMessage }}</span>
    </div>
</template>
