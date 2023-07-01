<script setup lang="ts">
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();
const emit = defineEmits(['close']);

const props = defineProps({
    isViewActive: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const callout1Config = new CalloutConfigStructure({
    size: new Vector2(362, 220),
    position: new Vector2(205, 208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

function close(): void {
    emit('close');
}

</script>
<template>
    <div class="edu2-card card2" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon2.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">{{ lang('edu2.card2.title') }}</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>{{ lang('edu2.card2.title') }}</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1212" height="351" viewBox="0 0 1212 351" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                        d="M26.1457 344.126C345.826 276.009 641.467 379.835 768.316 175.261C843.851 53.4446 1049.06 10.5131 1213 0.57332L1213 349.759L0.499318 349.759C8.95988 347.845 17.5092 345.966 26.1457 344.126Z"
                        fill="#D4E1E9" stroke="#D4E1E9"/>
            </svg>

            <div class="text-frame">
                <div v-html="lang('edu2.card2.text1')"/>

                <div class="box">
                    <svg width="650" height="94" viewBox="0 0 650 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M402.896 37.6901C228.267 49.5956 137.134 1.32998 25.6364 0.0428993C14.6032 -0.084463 4.23006 0.0756812 -5.5 0.471206V94H655.5V10.4679C650.137 10.4783 644.678 10.541 639.128 10.6613C535.268 12.9137 577.525 25.7846 402.896 37.6901Z"
                              fill="#D4E1E9"/>
                    </svg>

                    <div v-html="lang('edu2.card2.text2')"/>
                </div>

                <div v-html="lang('edu2.card2.text3')"/>
            </div>

            <div class="image-frame">
                <img alt="" src="@images/edu2-image2.png"/>

                <div>{{ lang('edu2.card2.note') }}</div>
            </div>
        </div>
    </div>
</template>