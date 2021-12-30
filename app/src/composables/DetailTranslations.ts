import {computed, ref} from 'vue';
import DetailCommonStructure from "@src/structures/DetailCommonStructure";

const selectedLanguage = ref<string>('');
const commonTranslations = ref<{[key: string]: DetailCommonStructure}>({});
const languages = ref<Array<string>>([]);

export default () => {

    function setTranslations(translations: {[key: string]: DetailCommonStructure}): void {
        commonTranslations.value = translations;
    }

    const translations = computed(() => {
        return commonTranslations.value[selectedLanguage.value] || new DetailCommonStructure({});
    });

    function setLanguages(lang: Array<string>): void {
        languages.value = lang;
    }

    function isLanguageSelected(language: string): boolean{
        return selectedLanguage.value === language;
    }

    function selectLanguage(language: string): void {
        selectedLanguage.value = language
    }

    return {
        setTranslations,
        setLanguages,
        translations,
        languages,
        selectedLanguage,
        isLanguageSelected,
        selectLanguage
    };
}