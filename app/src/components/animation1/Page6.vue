<script setup lang="ts">
import {ref, watch} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();
const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const pageVideo = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);
const active2 = ref(false);

function stopVideo(): void {
    if (pageVideo.value) {
        pageVideo.value.pause();
        pageVideo.value.currentTime = 0;
    }
}

watch(() => props.isActive, (value: boolean) => {
    if (pageVideo.value) {
        if (value) {
            pageVideo.value.play();
        } else {
            stopVideo();
        }
    }
});

function prevPage(): void {
    stopVideo();
    emit('prev');
}

watch(() => props.isActive, (active) => {
    setTimeout(() => {
        active1.value = true
        setTimeout(() => {
            active2.value = true
        }, 2500);
    }, 1000);
});

</script>
<template>
    <div class="anim1-page-bg">
        <img src="@images/anim1-bg5.svg" alt="">

        <div class="video page5-video">
            <video muted loop ref="pageVideo" disablePictureInPicture>
                <source src="/video/Pusaudzis_Pieaudzis.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>

    <div class="anim1-page5-details">
        <div class="vertical-bullet-points">
            <div class="ball" :class="{active: active1}">
                <div></div>
            </div>
            <div class="second" :class="{active: active2}">
                <div class="line"></div>
                <div class="ball">
                    <div></div>
                </div>
            </div>
        </div>
    </div>

    <div class="anim1-page5-text">
        <div class="text-collapse text-1" :class="{active: active1}">
            <div v-html="lang('anim1.page6.text1')"/>
        </div>
        <div class="text-collapse text-2" :class="{active: active2}">
            <div v-html="lang('anim1.page6.text2')"/>
        </div>
    </div>

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>{{ lang('common.back') }}</span>
    </div>

    <div class="back-filter" @click="emit('restart')">
        <img src="@images/arrow-left.svg" alt="">
        <span>{{ lang('common.toBeginning') }}</span>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('restart', true)">
        <span>{{ lang('common.finish') }}</span>
        <img src="@images/chevron-right.svg" alt="">
    </div>

</template>