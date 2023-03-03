<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import Page1 from "@src/components/educational1/Page1.vue";
import Page2 from "@src/components/educational1/Page2.vue";
import Page3 from "@src/components/educational1/Page3.vue";
import Page4 from "@src/components/educational1/Page4.vue";
import Page5 from "@src/components/educational1/Page5.vue";
import Page6 from "@src/components/educational1/Page6.vue";
import Page7 from "@src/components/educational1/Page7.vue";
import NumericPagination from "@src/composables/NumericPagination";
import {onMounted, ref} from "vue";
import InputHandlerService from "@src/services/InputHandlerService";
import DetailListItem from "@src/structures/DetailListItem";

const router = useRouter();

const pageComponents = [
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
];

const {
    getAnimationState,
    isSelectedPage,
    selectNextPage,
    selectPrevPage,
    selectPage,
    currentPage
} = NumericPagination();

const selectedItem = ref<DetailListItem | null>(null);

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

function showDetail(isOpen: boolean, detail: DetailListItem | null): void {
    selectedItem.value = detail;
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

    // selectNextPage();
    // selectNextPage();
    // selectNextPage();
    // selectNextPage();
    // selectNextPage();
    // selectNextPage();
});

</script>
<template>
    <div class="content-1080p bg-white anim2-container">
        <navigation-bar>
            <span v-if="selectedItem">
                {{ selectedItem.title }}
                <span class="latin-title" v-html="selectedItem.latinTitle"></span>
            </span>
            <span v-else>
                Baltijas Jūra
            </span>
        </navigation-bar>

        <div
            v-for="(component, index) in pageComponents"
            :key="index"
            class="full-slider-container initial-right"
            :class="[getAnimationState(index)]"
        >
            <component
                :is="component"
                :is-active="isSelectedPage(index)"
                @next="selectNextPage"
                @prev="selectPrevPage"
                @restart="navigateToMain"
                @show-detail="showDetail"
            />
        </div>

        <svg viewBox="0 0 1920 1080" class="edubg1" :data-page="currentPage" :class="{step1:(currentPage===1)}">
            <path
                style="fill:#D4E1E9;stroke:none;"
                d="m -25.099184,1122.9304 c 0,0 33.0568332,2.0441 64.222728,3.376 34.627559,1.4798 73.621146,0.6098 116.482596,-3.3235 23.79282,-2.1835 58.93168,-9.6031 105.45391,-35.0462 36.43365,-19.9257 97.34488,-63.5148 155.20318,-94.35314 43.4482,-23.1579 101.3643,-40.2438 142.6272,-47.1852 42.6242,-7.1704 100.1779,-0.1397 141.3591,9.7876 44.7615,10.7904 110.1927,47.51454 144.537,61.87954 40.6174,16.9887 106.6756,26.4482 147.5293,21.1692 35.34267,-4.5668 90.92257,-25.6011 142.29877,-64.33434 72.9172,-54.9732 103.3154,-95.4087 128.6284,-124.3114 28.5824,-32.6359 81.6487,-101.6801 113.4833,-149.3844 26.1649,-39.2082 104.1722,-120.2702 134.2633,-145.6359 34.2499,-28.8713 124.07,-90.8065 159.3458,-113.3105 39.8385,-25.4147 81.7525,-50.5098 134.3413,-77.2706 54.5669,-27.7674 97.6886,-45.7709 135.1581,-59.512 42.228,-15.4863 61.2722,-4.0828 61.2722,-4.0828 l 2.7415,894.22904 -2028.45107,-2.7733 z"
                id="path284"
            />
        </svg>

<!--        <div v-if="currentPage===0" class="back-filter" @click="navigateToMain">-->
<!--            <img src="@images/arrow-left.svg" alt="">-->
<!--            <span>Izvēlne</span>-->
<!--        </div>-->
        <div v-if="currentPage!==0" class="back-filter" @click="selectPage(0)">
            <img src="@images/arrow-left.svg" alt="">
            <span>Uz sākumu</span>
        </div>
    </div>
</template>
