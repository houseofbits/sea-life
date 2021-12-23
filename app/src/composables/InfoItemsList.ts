import {onMounted, ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";
import HttpService from "@src/services/HttpService";

export default () => {

    const languages = {
        lv: 'LV',
        en: 'EN',
        ru: 'RU',
        de: 'DE',
    };

    const listItems = ref<Array<Array<DetailListItem>>>([]);
    const selectedPage = ref(0);
    const selectedItem = ref<number | null>(null);

    function isLanguageSelected(language: string): boolean{
        return false;
    }

    function selectLanguage(language: string): void {
        fetchListItems();
    }

    function selectItem(id: number): void {
        selectedItem.value = id;
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

    function fetchListItems(): void {
        HttpService.getList().then(items => {
            let i = 0;
            listItems.value.push([]);
            for (const item of items) {
                listItems.value[i].push(item);
                if (listItems.value[i].length >= 8) {
                    i++;
                    listItems.value.push([]);
                }
            }

        });
    }

    function isItemSelected(item: DetailListItem): boolean {
        return item.id === selectedItem.value;
    }

    onMounted(() => fetchListItems());

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
        selectedPage
    };
}