import {computed, ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";


export default () => {

    const selectedPage = ref(0);

    function nextPage(numItems: number): void {
        if (selectedPage.value < numItems - 1) {
            selectedPage.value++;
        }
    }

    function prevPage(): void {
        if (selectedPage.value > 0) {
            selectedPage.value--;
        }
    }

    function hasNextPage(numItems: number): boolean {
        return selectedPage.value < numItems - 1;
    }

    const hasPrevPage = computed(() => {
        return selectedPage.value > 0;
    });

    return {
        selectedPage,
        nextPage,
        prevPage,
        hasNextPage,
        hasPrevPage
    };
}