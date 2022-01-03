import {ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";

export default () => {

    const selectedItemId = ref<number | null>(null);

    function selectItem(itemId: number): void {
        selectedItemId.value = itemId;
    }

    function closeItem(): void {
        selectedItemId.value = null;
    }

    function isItemSelected(item: DetailListItem): boolean {
        return selectedItemId.value !== null && item.id == selectedItemId.value;
    }

    return {
        isItemSelected,
        selectItem,
        closeItem,
        selectedItemId,
    };
}