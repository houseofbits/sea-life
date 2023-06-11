<script setup lang="ts">

import {useRouter} from "vue-router";
import DetailTranslations from "@src/composables/DetailTranslations";
import {computed} from "vue";

const router = useRouter();

const {
    translations,
    languages,
    selectedLanguage,
    selectLanguage,
    isLanguageSelected,
} = DetailTranslations();

const props = defineProps({
    languages: {
        type: Array,
        default: null
    },
    isHomeButtonVisible: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['selectLanguage']);

const isHomeButtonVisibleLocal = computed(() => {
    if (selectedLanguage.value !== 'lv') {
        return false;
    }
    return props.isHomeButtonVisible;
});

function selectLanguageAction(language: string): void {
    selectLanguage(language);
    if (selectedLanguage.value !== 'lv') {
        router.push('/info');
    }
}

</script>
<template>
    <div class="navigation-bar">
        <div class="left-side">
            <img src="@images/logo.svg" alt="" width="64">
            <div v-if="isHomeButtonVisibleLocal" class="home-button" @click="router.push('/')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_1158_792" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                          height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_1158_792)">
                        <path d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"
                              fill="#729DB7"/>
                    </g>
                </svg>
                <span>Sākums</span>
            </div>
        </div>
        <div class="header-title">
            <slot/>
        </div>
        <div style="flex-grow: 2;"></div>
        <div class="right-side">
            <slot name="links"/>
            <div v-if="languages" class="languages flex">
                <img v-for="language in languages" :src="'/images/flag-' + language + '.svg'" :alt="language"
                     :class="{selected: isLanguageSelected(language)}"
                     @click="selectLanguageAction(language)">
            </div>
        </div>
    </div>
</template>