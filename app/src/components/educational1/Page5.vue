<script setup lang="ts">
import {ref, watch} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();
const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const mainVideo = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);
const isVideoOpen = ref(false);

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
        if (mainVideo.value) {
            mainVideo.value.currentTime = 0;
            isVideoOpen.value = false;
        }
    } else {
        active1.value = false;
    }
});

watch(() => isVideoOpen.value, (value: boolean) => {
    if (mainVideo.value) {
        if (value) {
            setTimeout(() => {
                if (mainVideo.value) {
                    mainVideo.value.play();
                }
            }, 500);
        } else {
            mainVideo.value.pause();
        }
    }
});

function prevPage(): void {
    emit('prev');
}

</script>
<template>

    <div class="edu1-information-block page5-position">
        <div class="small-header">{{ lang('edu1.page5.title') }}</div>

        <div class="text-block mb40" v-html="lang('edu1.page5.text1')" />

        <div class="text-block" v-html="lang('edu1.page5.text2')" />

        <div class="page5-waves-block">
            <div class="waves-graphic page5-height">
                <div class="static-wrapper">
                    <svg viewBox="0 0 620 130" :class="{active: active1}">
                        <path
                            style="fill:#D4E1E9;stroke:none;"
                            d="m 0.51927134,121.32766 c 0,0 10.37070066,6.7911 24.67260066,3.8127 12.8828,-2.68287 24.145196,0.9116 31.823481,-0.0169 15.410381,-1.86344 17.722784,-1.7075 22.666401,-0.75402 8.932843,1.72288 13.138312,0.53431 29.053446,0.16532 10.88722,-0.25242 13.18402,-1.86587 28.56948,-0.0453 17.85252,2.11248 30.75208,0.5824 43.73686,0.90321 12.11372,0.29928 13.51946,1.52514 26.47809,1.48555 7.58121,-0.0232 9.00944,-0.0739 20.9814,-0.3925 12.77087,-0.33985 21.13507,-1.14788 28.7664,-0.80918 12.22473,0.54256 20.02647,1.65855 35.93046,0.5325 13.93179,-0.98642 16.33511,-1.00292 53.0336,-1.01573 22.92221,-0.008 45.60651,-0.60811 67.11636,0.65387 15.46802,0.90751 25.10053,-0.094 41.58745,-0.5753 15.57211,-0.45456 23.37024,0.4 34.39126,-0.31485 11.20811,-0.727 18.34761,0.44963 33.9111,1.48925 9.23378,0.61681 24.81282,-1.20703 52.51303,-0.0695 24.44483,1.00383 44.40494,-2.63803 44.40494,-2.63803 l -0.10303,4.23127 -620.45070422,-0.54552 z"
                        />
                    </svg>
                    <div class="title">{{ lang('edu1.page5.subtitle') }}</div>
                    <div class="sub-title">{{ lang('edu1.page5.subtitle.text') }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-background-overlay" :class="{active:isVideoOpen}"></div>
    <div class="edu1-expandable-circle page5" :class="{active:isVideoOpen}" @click="isVideoOpen=!isVideoOpen">
        <div class="status-bar">
            <span>{{ lang('edu1.page5.modalTitle') }}</span>
            <img class="close" src="@images/cross.svg" alt="">
        </div>
        <video class="content" muted loop ref="mainVideo" disablePictureInPicture>
            <source src="/video/LHEI_2021.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <svg class="play-button" width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M57.5824 100.5L100.499 73L57.5824 45.5V100.5ZM73.0353 145.5C63.0111 145.5 53.5853 143.598 44.7578 139.794C35.9301 135.989 28.2513 130.826 21.7213 124.304C15.1915 117.783 10.0219 110.113 6.21277 101.297C2.40361 92.4807 0.499023 83.0604 0.499023 73.0363C0.499023 63.0121 2.40118 53.5862 6.20548 44.7587C10.0099 35.9311 15.173 28.2524 21.6946 21.7225C28.2165 15.1925 35.8856 10.0229 44.7019 6.21375C53.5183 2.40458 62.9386 0.5 72.9628 0.5C82.9869 0.5 92.4128 2.40215 101.24 6.20646C110.068 10.0109 117.747 15.174 124.277 21.6956C130.807 28.2174 135.976 35.8865 139.785 44.7029C143.594 53.5193 145.499 62.9396 145.499 72.9637C145.499 82.9879 143.597 92.4137 139.793 101.241C135.988 110.069 130.825 117.748 124.303 124.278C117.782 130.808 110.112 135.977 101.296 139.786C92.4797 143.595 83.0594 145.5 73.0353 145.5ZM72.999 139.667C91.6101 139.667 107.374 133.208 120.291 120.292C133.207 107.375 139.666 91.6111 139.666 73C139.666 54.3889 133.207 38.625 120.291 25.7083C107.374 12.7917 91.6101 6.33333 72.999 6.33333C54.3879 6.33333 38.624 12.7917 25.7074 25.7083C12.7907 38.625 6.33236 54.3889 6.33236 73C6.33236 91.6111 12.7907 107.375 25.7074 120.292C38.624 133.208 54.3879 139.667 72.999 139.667Z" fill="#555555"/>
        </svg>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>{{ lang('common.back') }}</span>
    </div>

</template>