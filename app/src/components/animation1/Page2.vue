<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();
const infoVideo1 = ref<HTMLMediaElement | null>(null);
const infoVideo2 = ref<HTMLMediaElement | null>(null);
const infoVideo3 = ref<HTMLMediaElement | null>(null);

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const activeElement = ref<number | null>(null);

function stopAllVideo(): void {
    if (infoVideo1.value) {
        infoVideo1.value.pause();
        infoVideo1.value.currentTime = 0;
    }
    if (infoVideo2.value) {
        if (!infoVideo2.value.paused) {
            infoVideo2.value.pause();
        }
        infoVideo2.value.currentTime = 0.2;
    }
    if (infoVideo3.value) {
        infoVideo3.value.pause();
        infoVideo3.value.currentTime = 0;
    }
}

function selectElement(id: number): void {
    stopAllVideo();

    activeElement.value = id;

    if (infoVideo1.value) {
        if (id === 1) {
            infoVideo1.value.play();
        }
    }
    if (infoVideo2.value) {
        if (id === 2) {
            infoVideo2.value.play();
        }
    }
    if (infoVideo3.value) {
        if (id === 3) {
            infoVideo3.value.play();
        }
    }
}

function getCardClasses(id: number): object {
    const isMinimized = activeElement.value !== null && activeElement.value !== id;
    let mini1 = false, mini2 = false;
    if (isMinimized && activeElement.value !== null) {
        const set = [1, 2, 3];
        set.splice((activeElement.value - 1), 1);
        mini1 = set[0] == id;
        mini2 = set[1] == id;
    }
    return {
        active: activeElement.value === id,
        minimized: isMinimized,
        mini1,
        mini2,
    };
}

watch(() => props.isActive, (value: boolean) => {
    if (activeElement.value != null) {
        selectElement(activeElement.value);
    }
});

onMounted(() => {
    stopAllVideo();
});

function getCalloutClasses(id: number): object {
    return {
        active: activeElement.value === id,
        faded: (activeElement.value !== id)
    };
}

function nextPage(): void {
    stopAllVideo();
    emit('next');
}

function returnMain(): void {
    stopAllVideo();
    emit('main');
}


</script>
<template>

    <div>

        <img class="anim1-info-bg1" :class="{faded: (activeElement !== null)}" src="@images/anim1-info-bg1.svg" alt=""
             oncontextmenu="return false;">
        <img class="anim1-info-bg1" :class="{faded: (activeElement === null)}" src="@images/anim1-info-bg2.svg" alt=""
             oncontextmenu="return false;">

        <div
            class="expandable-card card1"
            :class="getCardClasses(1)"
            @click="selectElement(1)">

            <div class="globe-border info"></div>

            <div class="card-video">
                <video muted loop ref="infoVideo1" disablePictureInPicture>
                    <source src="/video/Globuss_Aug_Narsto_Jura_2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <svg class="play-button" width="146" height="146" viewBox="0 0 146 146" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57.5824 100.5L100.499 73L57.5824 45.5V100.5ZM73.0353 145.5C63.0111 145.5 53.5853 143.598 44.7578 139.794C35.9301 135.989 28.2513 130.826 21.7213 124.304C15.1915 117.783 10.0219 110.113 6.21277 101.297C2.40361 92.4807 0.499023 83.0604 0.499023 73.0363C0.499023 63.0121 2.40118 53.5862 6.20548 44.7587C10.0099 35.9311 15.173 28.2524 21.6946 21.7225C28.2165 15.1925 35.8856 10.0229 44.7019 6.21375C53.5183 2.40458 62.9386 0.5 72.9628 0.5C82.9869 0.5 92.4128 2.40215 101.24 6.20646C110.068 10.0109 117.747 15.174 124.277 21.6956C130.807 28.2174 135.976 35.8865 139.785 44.7029C143.594 53.5193 145.499 62.9396 145.499 72.9637C145.499 82.9879 143.597 92.4137 139.793 101.241C135.988 110.069 130.825 117.748 124.303 124.278C117.782 130.808 110.112 135.977 101.296 139.786C92.4797 143.595 83.0594 145.5 73.0353 145.5ZM72.999 139.667C91.6101 139.667 107.374 133.208 120.291 120.292C133.207 107.375 139.666 91.6111 139.666 73C139.666 54.3889 133.207 38.625 120.291 25.7083C107.374 12.7917 91.6101 6.33333 72.999 6.33333C54.3879 6.33333 38.624 12.7917 25.7074 25.7083C12.7907 38.625 6.33236 54.3889 6.33236 73C6.33236 91.6111 12.7907 107.375 25.7074 120.292C38.624 133.208 54.3879 139.667 72.999 139.667Z"
                        fill="#555555"/>
                </svg>
            </div>

            <div class="card-title">{{ lang('anim1.page2.card1.title') }}</div>
            <div class="card-subtitle">{{ lang('anim1.page2.card1.text') }}</div>
        </div>

        <div
            class="expandable-card card2"
            :class="getCardClasses(2)"
            @click="selectElement(2)">

            <div class="globe-border info"></div>

            <div class="card-video">
                <video muted loop ref="infoVideo2" disablePictureInPicture>
                    <source src="/video/Globuss_Aug_Jura_Narsto_Upes_2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <svg class="play-button" width="146" height="146" viewBox="0 0 146 146" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57.5824 100.5L100.499 73L57.5824 45.5V100.5ZM73.0353 145.5C63.0111 145.5 53.5853 143.598 44.7578 139.794C35.9301 135.989 28.2513 130.826 21.7213 124.304C15.1915 117.783 10.0219 110.113 6.21277 101.297C2.40361 92.4807 0.499023 83.0604 0.499023 73.0363C0.499023 63.0121 2.40118 53.5862 6.20548 44.7587C10.0099 35.9311 15.173 28.2524 21.6946 21.7225C28.2165 15.1925 35.8856 10.0229 44.7019 6.21375C53.5183 2.40458 62.9386 0.5 72.9628 0.5C82.9869 0.5 92.4128 2.40215 101.24 6.20646C110.068 10.0109 117.747 15.174 124.277 21.6956C130.807 28.2174 135.976 35.8865 139.785 44.7029C143.594 53.5193 145.499 62.9396 145.499 72.9637C145.499 82.9879 143.597 92.4137 139.793 101.241C135.988 110.069 130.825 117.748 124.303 124.278C117.782 130.808 110.112 135.977 101.296 139.786C92.4797 143.595 83.0594 145.5 73.0353 145.5ZM72.999 139.667C91.6101 139.667 107.374 133.208 120.291 120.292C133.207 107.375 139.666 91.6111 139.666 73C139.666 54.3889 133.207 38.625 120.291 25.7083C107.374 12.7917 91.6101 6.33333 72.999 6.33333C54.3879 6.33333 38.624 12.7917 25.7074 25.7083C12.7907 38.625 6.33236 54.3889 6.33236 73C6.33236 91.6111 12.7907 107.375 25.7074 120.292C38.624 133.208 54.3879 139.667 72.999 139.667Z"
                        fill="#555555"/>
                </svg>
            </div>

            <div class="card-title">{{ lang('anim1.page2.card2.title') }}</div>
            <div class="card-subtitle">{{ lang('anim1.page2.card2.text') }}</div>
        </div>

        <div
            class="expandable-card card3"
            :class="getCardClasses(3)"
            @click="selectElement(3)">

            <div class="globe-border info"></div>

            <div class="card-video">
                <video muted loop ref="infoVideo3" disablePictureInPicture>
                    <source src="/video/Globuss_Aug_Jura_Narsto_Okeana_2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <svg class="play-button" width="146" height="146" viewBox="0 0 146 146" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M57.5824 100.5L100.499 73L57.5824 45.5V100.5ZM73.0353 145.5C63.0111 145.5 53.5853 143.598 44.7578 139.794C35.9301 135.989 28.2513 130.826 21.7213 124.304C15.1915 117.783 10.0219 110.113 6.21277 101.297C2.40361 92.4807 0.499023 83.0604 0.499023 73.0363C0.499023 63.0121 2.40118 53.5862 6.20548 44.7587C10.0099 35.9311 15.173 28.2524 21.6946 21.7225C28.2165 15.1925 35.8856 10.0229 44.7019 6.21375C53.5183 2.40458 62.9386 0.5 72.9628 0.5C82.9869 0.5 92.4128 2.40215 101.24 6.20646C110.068 10.0109 117.747 15.174 124.277 21.6956C130.807 28.2174 135.976 35.8865 139.785 44.7029C143.594 53.5193 145.499 62.9396 145.499 72.9637C145.499 82.9879 143.597 92.4137 139.793 101.241C135.988 110.069 130.825 117.748 124.303 124.278C117.782 130.808 110.112 135.977 101.296 139.786C92.4797 143.595 83.0594 145.5 73.0353 145.5ZM72.999 139.667C91.6101 139.667 107.374 133.208 120.291 120.292C133.207 107.375 139.666 91.6111 139.666 73C139.666 54.3889 133.207 38.625 120.291 25.7083C107.374 12.7917 91.6101 6.33333 72.999 6.33333C54.3879 6.33333 38.624 12.7917 25.7074 25.7083C12.7907 38.625 6.33236 54.3889 6.33236 73C6.33236 91.6111 12.7907 107.375 25.7074 120.292C38.624 133.208 54.3879 139.667 72.999 139.667Z"
                        fill="#555555"/>
                </svg>
            </div>

            <div class="card-title">{{ lang('anim1.page2.card3.title') }}</div>
            <div class="card-subtitle">{{ lang('anim1.page2.card3.text') }}</div>
        </div>
    </div>

    <div class="ball-callout page2-callout" :class="getCalloutClasses(1)">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="fixed-text">
                <span class="title">{{ lang('anim1.page2.callout1.title') }}</span>
                <span v-html="lang('anim1.page2.callout1.text')" />
            </div>
        </div>
    </div>

    <div class="ball-callout page2-callout" :class="getCalloutClasses(2)">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="fixed-text">
                <span class="title">{{ lang('anim1.page2.callout2.title') }}</span>
                <span v-html="lang('anim1.page2.callout2.text')" />
            </div>
        </div>
    </div>

    <div class="ball-callout page2-callout" :class="getCalloutClasses(3)">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>
        <div class="content">
            <div class="fixed-text">
                <span class="title">{{ lang('anim1.page2.callout3.title') }}</span>
                <span v-html="lang('anim1.page2.callout3.text')" />
            </div>
        </div>
    </div>

    <div class="info-zero-state-title" :class="{faded: activeElement !== null}">Zivju vairošanās – nārsts</div>

    <div v-if="activeElement" class="page-navigation-link horizontal right" @click="nextPage">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" alt="" class="bounce-right-anim" oncontextmenu="return false;">
    </div>

    <div class="back-filter" @click="emit('restart')">
        <img src="@images/arrow-left.svg" alt="" oncontextmenu="return false;">
        <span>{{ lang('common.toBeginning') }}</span>
    </div>

</template>