import {ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";

export default () => {

    const selectedItem = ref<DetailListItem | null>(null);

    function selectItem(item: DetailListItem): void {
        selectedItem.value = item;
    }

    function closeItem(): void {
        selectedItem.value = null;
    }

    function isItemSelected(item: DetailListItem): boolean {
        return item.id === selectedItem.value?.id;
    }

    return {
        isItemSelected,
        selectItem,
        closeItem,
        selectedItem,
    };
}