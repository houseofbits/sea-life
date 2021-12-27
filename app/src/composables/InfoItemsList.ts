import {ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";
import DetailViewService from "@src/services/DetailViewService";

export default () => {

    const listItems = ref<Array<Array<DetailListItem>>>([]);
    const selectedItem = ref<DetailListItem | null>(null);

    function selectItem(item: DetailListItem): void {
        selectedItem.value = item;
    }

    function closeItem(): void {
        selectedItem.value = null;
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

    function selectListItems(language: string): void {
        listItems.value = splitListItemsIntoPages(DetailViewService.getItemForLanguage(language));
    }

    function isItemSelected(item: DetailListItem): boolean {
        return item.id === selectedItem.value?.id;
    }

    return {
        isItemSelected,
        selectItem,
        closeItem,
        listItems,
        selectedItem,
        selectListItems
    };
}