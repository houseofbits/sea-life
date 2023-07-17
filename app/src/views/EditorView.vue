<script setup lang="ts">
import Sidebar from "@src/components/editor/Sidebar.vue";
import ItemForm from "@src/components/editor/ItemForm.vue";
import LanguageTabs from "@src/components/editor/LanguageTabs.vue";
import {ref, onMounted, watch, computed} from "vue";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import EditorGlobalState from "@src/composables/EditorGlobalState";
import LeaveFormModal from "@src/components/editor/LeaveFormModal.vue";
import AuthenticationModal from "@src/components/editor/AuthenticationModal.vue";

const content = ref<DetailContentStructure | null>(null);
const errorMessage = ref<string | null>(null);
const selectedItemIndex = ref<number | null>(null);
const selectedLanguage = ref<string | null>(null);

const {
    isLeavingPromptVisible,
    promptPageLeave,
    isLoading,
    setLoading,
    isAuthPromptVisible,
    passphrase
} = EditorGlobalState();

function selectItem(index: number) {
    promptPageLeave(() => {
        if (content.value) {
            selectedLanguage.value = content.value.config.baseLanguage;
            selectedItemIndex.value = index;
        }
    });
}

function selectLanguage(lang: string) {
    promptPageLeave(() => {
        selectedLanguage.value = lang;
    });
}

function isBaseLanguage(): boolean {
    return selectedLanguage.value === content.value?.config.baseLanguage;
}

watch(() => passphrase.value, (value: string|null)=>{
    if (value != null) {
        setLoading(true);
        DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
            content.value = result;
            selectedLanguage.value = content.value.config.baseLanguage;
        }).catch(e => {
            errorMessage.value = e.message;
        }).finally(() => {
            setLoading(false);
        });
    }
});

onMounted(() => {

});

const selectedItem = computed({
    get: () => {
        if (content.value && selectedItemIndex.value !== null) {
            return content.value.items[selectedItemIndex.value];
        }
        return null;
    },
    set: val => {
        if (val && content.value && selectedItemIndex.value !== null) {
            return content.value.items[selectedItemIndex.value] = val;
        }
    }
})


</script>
<template>
    <div class="flex space-x-2 h-full w-full">

        <div v-if="isLoading"
             class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-gray-500 text-xl font-semibold">Loading...</h2>
            <p class="w-1/3 text-center text-gray-500">This may take a few seconds, please don't close this page.</p>
        </div>

        <sidebar class="item w-72 h-auto" :items="content?.items" @select="selectItem"/>
        <div v-if="selectedItem" class="item w-auto h-auto flex-grow flex flex-col">
            <language-tabs :languages="content?.config.languages" :selected-language="selectedLanguage"
                           @select="selectLanguage" class="w-full border-b border-gray-200 dark:border-gray-700"/>
            <item-form v-model:item="selectedItem" :selected-language="selectedLanguage"
                       :is-base-language="isBaseLanguage()"/>
        </div>
    </div>

    <leave-form-modal v-if="isLeavingPromptVisible"/>

    <AuthenticationModal v-if="isAuthPromptVisible"/>
</template>