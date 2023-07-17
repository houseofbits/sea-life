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
    <div class="edu2-card card1" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon1.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">{{ lang('edu2.card1.title') }}</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>{{ lang('edu2.card1.title') }}</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1076" height="712" viewBox="0 0 1076 712" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M2.44813e-06 712L1076.5 711.999L1076.5 0.581651C571.828 11.4487 515.299 359.62 2.44813e-06 712Z"
                      fill="#D4E1E9"/>
            </svg>

            <div class="text" v-html="lang('edu2.card1.text')"/>

            <div class="small-card first">
                <img alt="" src="@images/edu2-image1.png"/>
                <div>{{ lang('edu2.card1.subtitle1') }}</div>
                <div>{{ lang('edu2.card1.subtitle1.text') }}</div>
            </div>

            <div class="small-card second">
                <img alt="" src="@images/edu2-image5.png"/>
                <div>{{ lang('edu2.card1.subtitle2') }}</div>
                <div>{{ lang('edu2.card1.subtitle2.text') }}</div>
            </div>

            <div class="bullet-points vertical-bullet-points">
                <div class="ball" :class="{active: true}">
                    <div/>
                </div>
                <div class="second active">
                    <div class="line"/>
                    <div class="ball">
                        <div/>
                    </div>
                </div>
                <div class="third active">
                    <div class="line"/>
                    <div class="ball">
                        <div/>
                    </div>
                </div>
                <div class="fourth active">
                    <div class="line"/>
                    <div class="ball">
                        <div/>
                    </div>
                </div>
                <div class="fifth active">
                    <div class="line"/>
                    <div class="ball">
                        <div/>
                    </div>
                </div>
            </div>

            <div class="bullet-texts">
                <div v-html="lang('edu2.card1.line1')" />
                <div v-html="lang('edu2.card1.line2')" />
                <div v-html="lang('edu2.card1.line3')" />
                <div v-html="lang('edu2.card1.line4')" />
                <div v-html="lang('edu2.card1.line5')" />
            </div>
        </div>
    </div>
</template>