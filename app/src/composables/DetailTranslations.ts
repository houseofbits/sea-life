import {ref} from 'vue';
import DetailViewService from "@src/services/DetailViewService";
import DetailCommon from "@src/structures/DetailCommon";

export default () => {

    const languages = ref<Array<string>>(DetailViewService.config.languages);
    const selectedLanguage = ref<string>(DetailViewService.config.languages[0]);
    const commonTexts = ref<DetailCommon>(DetailViewService.getCommon(selectedLanguage.value));

    function initLanguages(): void {
        languages.value = DetailViewService.config.languages;
        selectLanguage(DetailViewService.config.languages[0]);
    }

    function isLanguageSelected(language: string): boolean{
        return selectedLanguage.value === language;
    }

    function selectLanguage(language: string): void {
        selectedLanguage.value = language
        commonTexts.value = DetailViewService.getCommon(language);
    }

    return {
        initLanguages,
        languages,
        selectedLanguage,
        commonTexts,
        isLanguageSelected,
        selectLanguage
    };
}