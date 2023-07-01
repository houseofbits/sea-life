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

const mainVideo = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);
const active2 = ref(false);
const continueBounce = ref(false);

function stopVideo(): void {
    if (mainVideo.value) {
        mainVideo.value.pause();
        mainVideo.value.currentTime = 0;
    }
}

watch(() => props.isActive, (value: boolean) => {
    if (mainVideo.value) {
        if (value) {
            mainVideo.value.play();
            setTimeout(() => active1.value = true, 1000);
            setTimeout(() => active2.value = true, 12000);
            setTimeout(() => continueBounce.value = true, 15000);
        } else {
            stopVideo();
        }
    }
});

function prevPage(): void {
    emit('prev');
}

</script>
<template>
    <div class="content-1080p">
        <video width="1920" height="1080" muted loop ref="mainVideo" disablePictureInPicture>
            <source src="/video/stagars/5_Sarga_Alu.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <div class="text-collapse-horizontal page5-text1" :class="{active: active1}">
        <div v-html="lang('anim2.page5.text1')"/>
    </div>

    <div class="text-collapse-horizontal page5-text2" :class="{active: active2}">
        <div v-html="lang('anim2.page5.text2')"/>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" :class="{'bounce-right-anim':continueBounce}" alt="">
    </div>

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>{{ lang('common.back') }}</span>
    </div>

</template>