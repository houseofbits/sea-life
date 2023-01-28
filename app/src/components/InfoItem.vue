<script setup lang="ts">
import InfoDetailView from "@src/components/InfoDetailView.vue";
import DetailListItem from "@src/structures/DetailListItem";
import {watch, ref, computed} from "vue";
import IconContent from "@src/components/info/IconContent.vue";
import InfoVideo from "@src/components/info/InfoVideo.vue";

const DEFAULT_CARD_WIDTH = 445;

const emit = defineEmits(['close', 'map']);
const props = defineProps({
    item: {
        type: DetailListItem,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    isMapVisible: {
        type: Boolean,
        default: true
    },
    cardWidth: {
        type: Number,
        default: 445
    },
    cardHeight: {
        type: Number,
        default: 348
    }
});

const isOpenOrLoading = ref(false);

const activeView = ref<number | null>(null);
const previousView = ref<number | null>(null);

const cardStyle = computed(() => {
   return {
       width: props.cardWidth + 'px',
       height: props.cardHeight + 'px',
   };
});

function mainViewSliderClass(): string {
    if (activeView.value == 0) {
        return 'in-down';
    }
    if (activeView.value !== 0 && previousView.value !== activeView.value) {
        return 'out-up'
    }
    return '';
}

function infoViewSliderClass(): string {
    if (activeView.value == 1) {
        return 'in-up';
    }
    if (activeView.value !== 1 && previousView.value !== activeView.value) {
        return 'out-down'
    }
    return '';
}

function showInfo(): void {
    activeView.value = 1;
    previousView.value = 0;
}

function showMain(): void {
    activeView.value = 0;
    previousView.value = 1;
}

function getImageTransform(item: DetailListItem): string {
   const scale = props.cardWidth / DEFAULT_CARD_WIDTH;

    return props.isSelected
        ? item.detailImageTransform.getAsStyle()
        : item.thumbnailImageTransform.getScaled(scale).getAsStyle();
}

watch(() => props.isSelected, (isSelected: boolean) => {
    if (isSelected) {
        isOpenOrLoading.value = true;
        activeView.value = null;
    } else {
        setTimeout(() => isOpenOrLoading.value = false, 500);
    }
});

</script>
<template>
    <div
        class="detail-item"
        :class="{active: props.isSelected, 'on-top': isOpenOrLoading}"
        :style="cardStyle"
    >
        <div class="icon-background"/>

        <div class="full-slider-container" :class="mainViewSliderClass()" style="pointer-events: none">
            <img
                loading="eager"
                decoding="sync"
                class="main-image"
                :src="'/images/large/' + item.imageFileName"
                :style="getImageTransform(item)"
                alt=""
            />
            <info-detail-view
                v-if="isOpenOrLoading"
                style="pointer-events: all"
                :item="item"
                @close="emit('close')"
                :is-map-visible="isMapVisible"
                @map="emit('map')"
            />

            <div v-if="item.videoFileName" class="page-navigation-link vertical bottom" @click="showInfo"
                 style="pointer-events: all">
                <span>Video</span>
                <img src="@images/chevron-down.svg" alt="" class="bounce-up-anim">
            </div>
        </div>
        <div v-if="item.videoFileName" class="full-slider-container initial-bottom" :class="infoViewSliderClass()">
            <info-video :item="props.item" :is-active="activeView===1" @main="showMain"/>
        </div>

        <icon-content :item="props.item"/>
    </div>
</template>