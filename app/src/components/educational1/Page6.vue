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

const active1 = ref(false);

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
    } else {
        active1.value = false;
    }
});

function prevPage(): void {
    emit('prev');
}

</script>
<template>

    <div class="edu1-information-block page6">
        <div class="small-header">{{ lang('edu1.page6.title') }}</div>

        <div class="text-block" v-html="lang('edu1.page6.text')"/>

        <div class="box-wrapper">
            <div class="box">
                <img class="image" alt="" src=""/>

                <div class="title">{{ lang('edu1.page6.subtitle1') }}</div>

                <div class="text" v-html="lang('edu1.page6.subtitle1.text')"/>
            </div>

            <div class="box">
                <img class="image" alt="" src=""/>

                <div class="title">{{ lang('edu1.page6.subtitle2') }}</div>

                <div class="text" v-html="lang('edu1.page6.subtitle2.text')"/>
            </div>
        </div>
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