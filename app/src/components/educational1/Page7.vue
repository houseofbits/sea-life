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
    setTimeout(() => active1.value = true, 1000);
});

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
        isMapOpen.value = false;
    } else {
        active1.value = false;
    }
});

function prevPage(): void {
    emit('prev');
}

</script>
<template>

    <div class="edu1-information-block page7">
        <div class="small-header">{{ lang('edu1.page7.title') }}</div>

        <div class="text-block" v-html="lang('edu1.page7.text')" />

        <div class="card">
            <div class="title">{{ lang('edu1.page7.subtitle') }}</div>

            <div class="sub-title" v-html="lang('edu1.page7.subtitle.text')" />

            <div class="water-level-wrapper">
                <WaterLevel :is-active="active1" :wave-x="-40" :wave-y="40">
                    {{ lang('edu1.page7.subtitle.value') }}
                </WaterLevel>
                <div class="units-sign">{{ lang('edu1.page7.subtitle.sign') }}</div>
            </div>

            <div class="note" v-html="lang('edu1.page7.note')" />
        </div>
    </div>

    <div class="modal-background-overlay" :class="{active:isMapOpen}"></div>
    <div class="edu1-expandable-circle page7" :class="{active:isMapOpen}" @click="isMapOpen=!isMapOpen">
        <div class="status-bar">
            <span>{{ lang('edu1.page7.modalTitle') }}</span>
            <img class="close" src="@images/cross.svg" alt="">
        </div>
        <img class="content" alt="" src="@images/edu1-map2.png" />
    </div>

    <div class="edu1-page6-note" v-html="lang('edu1.page7.modalSubtitle')" />

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>{{ lang('common.back') }}</span>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('restart', true)">
        <span>{{ lang('common.finish') }}</span>
        <img src="@images/chevron-right.svg" alt="">
    </div>

</template>