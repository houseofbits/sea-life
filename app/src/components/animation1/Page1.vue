<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();
const emit = defineEmits(['prev', 'next', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});
const mainVideo = ref<HTMLMediaElement | null>(null);

const callout1Active = ref(false);
const callout2Active = ref(false);
const callout3Active = ref(false);

watch(() => props.isActive, (value: boolean) => {
    if (mainVideo.value) {
        if (value) {
            mainVideo.value.play();
        } else {
            mainVideo.value.pause();
        }
    }
});

onMounted(() => {
    if (mainVideo.value) {
        mainVideo.value.play();
    }

    setTimeout(() => {
        callout1Active.value = true;

        setTimeout(() => {
            callout2Active.value = true;

            setTimeout(() => {
                callout3Active.value = true;
            }, 500);
        }, 500);
    }, 500);
});

</script>
<template>

    <div class="video-1">
        <div class="globe-border"></div>
        <video width="1016" height="1019" muted loop ref="mainVideo" disablePictureInPicture>
            <source src="/video/Globuss.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <div class="ball-callout page1-callout1" :class="{active: callout1Active}">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>

        <div class="content">
            <div class="fraction" v-html="lang('anim1.page1.text1.number')"/>
            <div class="text" v-html="lang('anim1.page1.text1')"/>
        </div>
    </div>

    <div class="ball-callout page1-callout2" :class="{active: callout2Active}">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>

        <div class="content" v-html="lang('anim1.page1.text2')"/>
    </div>

    <div class="ball-callout page1-callout3" :class="{active: callout3Active}">
        <div class="ball">
            <div></div>
        </div>
        <div class="line"></div>

        <div class="content" v-html="lang('anim1.page1.text3')"/>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

</template>