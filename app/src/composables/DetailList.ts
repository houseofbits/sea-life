import {computed, reactive, ref} from "vue";
import DetailListItem from "@src/structures/DetailListItem";
import DetailListPageStructure from "@src/structures/DetailListPageStructure";

export default () => {

    const allPages = ref<Array<DetailListPageStructure>>([]);
    const currentPageId = ref<number | null>(null);
    const previousPageId = ref<number | null>(null);
    const currentGroup = ref<number | null>(null);

    function splitListItemsIntoPages(group: number | null, allListItems: Array<DetailListItem>): Array<DetailListPageStructure> {
        const pages: Array<DetailListPageStructure> = [];
        let i, j;
        const pageSize = 8;
        for (i = 0, j = allListItems.length; i < j; i += pageSize) {
            pages.push(
                new DetailListPageStructure(
                    group,
                    allListItems.slice(i, i + pageSize)
                )
            )
        }
        return pages;
    }

    function filterItems(group: number, allItems: Array<DetailListItem>): Array<DetailListItem> {
        return allItems.filter(item => item.group === group);
    }

    function filterAllPages(group: number | null): Array<DetailListPageStructure> {
        return allPages.value.filter(page => page.group === currentGroup.value);
    }

    function createPageGroupsFromItems(allItems: Array<DetailListItem>): void {

        allPages.value = [
            ...splitListItemsIntoPages(null, allItems),
            ...splitListItemsIntoPages(1, filterItems(1, allItems)),
            ...splitListItemsIntoPages(2, filterItems(2, allItems)),
            ...splitListItemsIntoPages(3, filterItems(3, allItems)),
            ...splitListItemsIntoPages(4, filterItems(4, allItems)),
        ];

        for (const [index, page] of allPages.value.entries()) {
            page.id = index + 1;
        }

        let prevPage = null;
        for (const [index, page] of allPages.value.entries()) {
            if (prevPage && page.group === prevPage.group) {
                page.previousPageId = prevPage?.id;
            }
            const nextPage = allPages.value[index + 1] || null;
            if (nextPage && page.group === nextPage.group) {
                page.nextPageId = nextPage.id;
            }
            prevPage = page;
        }
    }

    function findPageById(id: number): DetailListPageStructure | null {
        return allPages.value.find(page => page.id === id) || null;
    }

    function isActiveGroup(group: number | null): boolean {
        return currentGroup.value === group;
    }

    function selectGroup(group: number | null = null): void {
        previousPageId.value = currentPageId.value;
        currentGroup.value = group;
        currentPageId.value = pages.value[0].id;
    }

    function selectPage(page: DetailListPageStructure): void {
        if (currentPageId.value !== page.id) {
            previousPageId.value = currentPageId.value;
            currentPageId.value = page.id;
        }
    }

    function selectNextPage(): void {
        if (currentPageId.value !== null) {
            const currentPage = findPageById(currentPageId.value);
            if (currentPage?.nextPageId !== null) {
                previousPageId.value = currentPageId.value;
                currentPageId.value = currentPage?.nextPageId || null;
            }
        }
    }

    function selectPrevPage(): void {
        if (currentPageId.value !== null) {
            const currentPage = findPageById(currentPageId.value);
            if (currentPage?.previousPageId !== null) {
                previousPageId.value = currentPageId.value;
                currentPageId.value = currentPage?.previousPageId || null;
            }
        }
    }

    function getAnimationState(page: DetailListPageStructure): string | null {
        if (previousPageId.value !== null && currentPageId.value !== null) {
            const isOnLeft = previousPageId.value < currentPageId.value;
            if (page.id === currentPageId.value) {
                return isOnLeft ? 'in-left' : 'in-right';
            }
            if (page.id === previousPageId.value) {
                return isOnLeft ? 'out-left' : 'out-right';
            }
        }

        if (page.id === currentPageId.value) {
            return 'in-left';
        }
        return null;
    }

    function isActivePage(page: DetailListPageStructure): boolean {
        return page.id === currentPageId.value;
    }

    const pages = computed<Array<DetailListPageStructure>>((): Array<DetailListPageStructure> => {
        return filterAllPages(currentGroup.value);
    });
    const hasNextPage = computed((): boolean => {
        if (currentPageId.value !== null) {
            const currentPage = findPageById(currentPageId.value);
            return currentPage?.nextPageId !== null;
        }
        return false;
    });
    const hasPrevPage = computed((): boolean => {
        if (currentPageId.value !== null) {
            const currentPage = findPageById(currentPageId.value);
            return currentPage?.previousPageId !== null;
        }
        return false;
    });

    return {
        allPages,
        pages,
        createPageGroupsFromItems,
        selectNextPage,
        selectPrevPage,
        selectGroup,
        selectPage,
        hasNextPage,
        hasPrevPage,
        isActivePage,
        getAnimationState,
        isActiveGroup
    };
};