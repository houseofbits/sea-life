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
    <div class="edu2-card card4" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon4.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">{{ lang('edu2.card4.title') }}</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>{{ lang('edu2.card4.title') }}</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1090" height="662" viewBox="0 0 1090 662" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                        d="M984.691 71.33C702.844 305.181 641.541 716.6 317.537 601.692C204.783 561.703 95.4544 596.674 2 662.421L1089.5 662.421L1089.5 1.49998C1055.08 25.3791 1019.98 42.054 984.691 71.33Z"
                        fill="#D4E1E9" stroke="#D4E1E9"/>
            </svg>

            <div class="text-frame">
                <div v-html="lang('edu2.card4.text1')" />

                <div class="box">
                    <div v-html="lang('edu2.card4.text2')" />
                    <div class="sub-text" v-html="lang('edu2.card4.text3')" />

                    <div class="single-card">
                        <div class="absolute-wrapper">
                            <svg width="853" height="244" viewBox="0 0 853 244" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1312_772)">
                                    <rect width="853" height="244" fill="white"/>
                                    <path d="M578.563 -4.82649C224.568 -20.4216 7.53394 -3.4576 -224.943 4.26002C-301.253 6.79333 -345.486 -0.0960721 -403.638 -12.3349L-404.387 152.746L875.296 158.551L867.49 -20.7595C778.751 -31.5497 703.374 0.672048 578.563 -4.82649Z"
                                          fill="#D4E1E9"/>
                                    <path d="M382.881 46.6724C-102.788 28.0051 -187.237 67.2956 -422.738 82.9909C-500.041 88.1429 -560.255 85.0182 -619.628 79.1703L-614.97 193.075L903 161L957.5 43.5679L679.001 43.5679C588.657 40.0839 482.351 50.4956 382.881 46.6724Z"
                                          fill="#C8D7E0"/>
                                    <path d="M971.696 124.717C489.588 63.118 401.991 94.7764 166.026 89.5571C88.5701 87.8439 23.4236 89.2731 -35.1988 78.1909L-35.1988 182.187L1262.32 244.235L1266.93 147.845C1177.25 136.375 1070.44 137.333 971.696 124.717Z"
                                          fill="#BFCED7"/>
                                    <path d="M348 121.499C191.5 82 143.5 105.001 62.4999 67.5C23.4792 49.4345 17.9999 31 -11.5001 31L-225 248L406.317 280.743L1038 294.5L864 186.5L645.499 162.999C589 155 401.905 135.105 348 121.499Z"
                                          fill="white" stroke="#D4E1E9"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1312_772">
                                        <rect width="853" height="244" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>

                            <div class="text first">{{ lang('edu2.card4.text2.line1') }}</div>
                            <div class="text second">{{ lang('edu2.card4.text2.line2') }}</div>
                            <div class="text third">{{ lang('edu2.card4.text2.line3') }}</div>
                            <div class="text note">{{ lang('edu2.card4.text2.line4') }}</div>
                        </div>
                    </div>

                    <div class="annotation">{{ lang('edu2.card4.text2.note') }}</div>
                </div>

                <div v-html="lang('edu2.card4.text4')" />
            </div>

            <div class="image-frame">
                <img alt="" src="@images/edu2-image4.png"/>

                <div v-html="lang('edu2.card4.note')" />
            </div>

        </div>
    </div>
</template>