<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page1 from "@src/components/educational2/Page1.vue";
import NumericPagination from "@src/composables/NumericPagination";
import {onMounted} from "vue";
import InputHandlerService from "@src/services/InputHandlerService";

const router = useRouter();

const pageComponents = [
    Page1
];

const {
    getAnimationState,
    isSelectedPage,
    selectNextPage,
    selectPrevPage,
    selectPage,
    currentPage
} = NumericPagination();

function back(): void {
    router.push('/');
}

function navigateToPuzzle(): void {
    router.push('/puzzle');
}

function navigateToAnimation1(): void {
    router.push('/animation1');
}

function navigateToMain(): void {
    router.push('/');
}

onMounted(() => {
    const input = new InputHandlerService(document.querySelector('.anim2-container'));
    input.onSwipeRight(() => {
        if (currentPage.value < 5) {
            selectNextPage();
        }
    });
    input.onSwipeLeft(() => {
        if (currentPage.value > 0) {
            selectPrevPage();
        }
    });
});

</script>
<template>
    <div class="content-1080p bg-white anim2-container">
        <navigation-bar>
            <span>Barības ķēdes Baltijas jūrā</span>
        </navigation-bar>

        <div v-for="(component, index) in pageComponents" :key="index" class="full-slider-container initial-right"
             :class="[getAnimationState(index)]">
            <component :is="component" :is-active="isSelectedPage(index)" @next="selectNextPage" @prev="selectPrevPage" @restart="navigateToMain"/>
        </div>

        <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">
            <img src="@images/arrow-left.svg" alt="">
            <span>Izvēlne</span>
        </div>
        <div v-else class="back-filter" @click="selectPage(0)">
            <img src="@images/arrow-left.svg" alt="">
            <span>Uz sākumu</span>
        </div>
    </div>
</template>
