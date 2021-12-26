import {onMounted, ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";
import DetailViewService from "@src/services/DetailViewService";

export default () => {

    const languages = ref<Array<string>>([]);
    const listItems = ref<Array<Array<DetailListItem>>>([]);
    const selectedPage = ref(0);
    const selectedItem = ref<DetailListItem | null>(null);
    const selectedLanguage = ref<string>('lv');

    function isLanguageSelected(language: string): boolean{
        return selectedLanguage.value === language;
    }

    function selectLanguage(language: string): void {
        selectedLanguage.value = language
        selectListItems();
    }

    function selectItem(item: DetailListItem): void {
        selectedItem.value = item;
    }

    function closeItem(): void {
        selectedItem.value = null;
    }

    function nextPage(): void {
        if (selectedPage.value < listItems.value.length - 1) {
            selectedPage.value++;
        }
    }

    function prevPage(): void {
        if (selectedPage.value > 0) {
            selectedPage.value--;
        }
    }

    function splitListItemsIntoPages(allListItems: Array<DetailListItem>): Array<Array<DetailListItem>> {
        const items: Array<Array<DetailListItem>> = [];
        let i,j;
        const pageSize = 8;
        for (i = 0, j = allListItems.length; i < j; i += pageSize) {
            items.push(allListItems.slice(i, i + pageSize));
        }
        return items;
    }

    function selectListItems(): void {

        DetailViewService.fetchAll().then(completedService => {
            languages.value = completedService.config.languages;
            if (languages.value.length > 0) {
                selectedLanguage.value = languages.value[0];
                listItems.value = splitListItemsIntoPages(completedService.getItemForLanguage(selectedLanguage.value));
            }
        });
    }

    function isItemSelected(item: DetailListItem): boolean {
        return item.id === selectedItem.value?.id;
    }

    onMounted(() => selectListItems());

    return {
        isItemSelected,
        selectItem,
        closeItem,
        prevPage,
        nextPage,
        selectLanguage,
        isLanguageSelected,
        listItems,
        languages,
        selectedPage,
        selectedItem
    };
}