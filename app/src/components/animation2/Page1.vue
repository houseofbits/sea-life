<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

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
const isText1Hilighted = ref(true);
const isText2Hilighted = ref(true);

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
        } else {
            stopVideo();
        }
    }
});

onMounted(() => {
    if (mainVideo.value) {
        mainVideo.value.ontimeupdate = (event) => {
            if (event.srcElement.currentTime > 12.0) {
                isText1Hilighted.value = false;
                isText2Hilighted.value = false;
            } else if (event.srcElement.currentTime > 8.4) {
                isText1Hilighted.value = false;
                isText2Hilighted.value = true;
            } else if (event.srcElement.currentTime > 2.7) {
                isText1Hilighted.value = true;
                isText2Hilighted.value = false;
            }
        }

        mainVideo.value.play();
        setTimeout(() => active1.value = true, 1000);
        setTimeout(() => active2.value = true, 8000);
        setTimeout(() => continueBounce.value = true, 10000);
    }
});

</script>
<template>
    <div class="content-1080p">
        <video width="1920" height="1080" muted loop ref="mainVideo">
            <source src="/video/stagars/1_Paliek_Kosaks.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <div class="text-collapse-horizontal page1-text1 faded" :class="{active: active1, hilight: isText1Hilighted}">
        <div>Trīsadatu <strong>stagars ir neliela zivtiņa</strong>, kas Latvijā sastopama gan saldūdeņos, gan jūrā.
        </div>
    </div>

    <div class="text-collapse-horizontal page1-text2 faded" :class="{active: active2, hilight: isText2Hilighted}">
        <div><strong>Tuvojoties riesta laikam</strong> vairāku sugu <strong>zivis maina krāsu</strong>, tai skaitā
            stagaru tēviņi. Tiem iekrāsojas gaiši zilas acis, koši sarkans vēders un zila mugura.
        </div>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>Turpināt</span>
        <img src="@images/chevron-right.svg" :class="{'bounce-right-anim':continueBounce}" alt="">
    </div>

</template>