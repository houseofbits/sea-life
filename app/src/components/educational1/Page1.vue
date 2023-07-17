<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();

const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);
const isMapOpen = ref(false);

onMounted(() => {
    setTimeout(() => active1.value = true, 500);
});

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
        isMapOpen.value = false;
    } else {
        active1.value = false;
    }
});


</script>
<template>

    <div class="edu1-information-block">
        <div class="small-header">{{ lang('edu1.page1.title') }}</div>

        <div class="text-block" v-html="lang('edu1.page1.text')"/>

        <div class="cards-block">
            <div class="card">
                <div class="title">{{ lang('edu1.page1.subtitle1') }}</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-40" :wave-y="20" fill="#e2a3a0">
                        {{ lang('edu1.page1.subtitle1.value') }}
                    </WaterLevel>
                    <div class="units-sign">{{ lang('edu1.page1.subtitle1.sign') }}</div>
                </div>
            </div>
            <div class="card">
                <div class="title">{{ lang('edu1.page1.subtitle2') }}</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-70" :wave-y="40" fill="#ffe9bf">
                        {{ lang('edu1.page1.subtitle2.value') }}
                    </WaterLevel>
                    <div class="units-sign">{{ lang('edu1.page1.subtitle2.sign') }}</div>
                </div>
            </div>
            <div class="card">
                <div class="title">{{ lang('edu1.page1.subtitle3') }}</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-300" :wave-y="50">
                        {{ lang('edu1.page1.subtitle3.value') }}
                    </WaterLevel>
                    <div class="units-sign">{{ lang('edu1.page1.subtitle3.sign') }}</div>
                </div>
            </div>
        </div>

        <div class="note">{{ lang('edu1.page1.note') }}</div>
    </div>

    <div class="modal-background-overlay" :class="{active:isMapOpen}"></div>
    <div class="edu1-expandable-circle page1" :class="{active:isMapOpen}" @click="isMapOpen=!isMapOpen">
        <div class="status-bar">
            <span>{{ lang('edu1.page1.modalTitle') }}</span>
            <img class="close" src="@images/cross.svg" alt="">
        </div>
        <img class="content" alt="" src="@images/edu1-map1.png"/>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

</template>