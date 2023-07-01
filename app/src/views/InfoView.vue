<script setup lang="ts">
import InfoItem from "@src/components/InfoItem.vue";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailTranslations from "@src/composables/DetailTranslations";
import {computed, onMounted, watch} from "vue";
import DetailList from "@src/composables/DetailList";
import InputHandlerService from "@src/services/InputHandlerService";
import {ref} from "vue";
import NavigationBar from "@src/components/NavigationBar.vue";
import NavigationModal from "@src/components/info/NavigationModal.vue";
import DetailListItem from "@src/structures/DetailListItem";
import {useRouter} from "vue-router";
import DetailContentStructure from "@src/structures/DetailContentStructure";

const {
    isItemSelected,
    selectItem,
    closeItem,
    selectedItemId,
} = InfoItemsListComposable();

const {
    translations,
    languages,
    selectedLanguage,
    selectLanguage,
    lang
} = DetailTranslations();

const {
    detailContent,
    allPages,
    pages,
    createPageGroupsFromItems,
    selectNextPage,
    selectPrevPage,
    selectGroup,
    hasNextPage,
    hasPrevPage,
    selectPage,
    getAnimationState,
    isActivePage,
    isActiveGroup
} = DetailList();

const router = useRouter();

const isMapModalOpen = ref(false);
const allItems = ref<Array<DetailListItem>>([]);

function openMapModal(): void {
    isMapModalOpen.value = true;
}

function closeMapModal(): void {
    isMapModalOpen.value = false;
}

function initContent(detailContent: DetailContentStructure) {
    allItems.value = detailContent.items;
    createPageGroupsFromItems(detailContent.items);
    selectGroup();
}

watch(() => detailContent.value, (value) => {
    if (value) {
        initContent(value);
    }
});

onMounted(() => {

    if (detailContent.value) {
        initContent(detailContent.value);
    }

    const input = new InputHandlerService(document.querySelector('.detail-list'));
    input.onSwipeLeft(() => {
        if (!selectedItemId.value && !isMapModalOpen.value) {
            selectPrevPage();
        }
    });
    input.onSwipeRight(() => {
        if (!selectedItemId.value && !isMapModalOpen.value) {
            selectNextPage();
        }
    });
    input.onSelectItem(selectItem);
});

const itemTitle = computed<string>(() => {
    for (const page of pages.value) {
        const item = page.items.find(elem => elem.id == selectedItemId.value) || null;
        if (item) {
            return item.getTranslatedItem(selectedLanguage.value).title;
        }
    }

    return '';
});

const itemLatinTitle = computed<string>(() => {
    for (const page of pages.value) {
        const item = page.items.find(elem => elem.id == selectedItemId.value) || null;
        if (item) {
            return item.getTranslatedItem(selectedLanguage.value).latinTitle;
        }
    }
    return '';
});

function selectItemFromModal(itemId: number): void {

    isMapModalOpen.value = false;

    if (selectedItemId.value == itemId) {
        return;
    }

    const page = allPages.value.find(page => {
        return page.group === null && !!page.items.find(item => item.id === itemId);
    });
    if (page) {
        selectGroup(null);
        selectPage(page);
    }
    closeItem();
    setTimeout(() => selectItem(itemId), 500);
}

const isBackButtonVisible = computed(() => {
    return selectedLanguage.value === 'lv';
});

function navigateToMain(): void {
    router.push('/');
}

</script>

<template>
    <div class="content-1080p detail-list">

        <navigation-bar :languages="languages" @selectLanguage="selectLanguage">

          <span v-if="!selectedItemId" @click="selectGroup(null)">
            {{ lang('species.title') }}
          </span>
            <span v-else>
                {{ itemTitle }}
                <span class="latin-title" v-html="itemLatinTitle"></span>
              </span>

            <template #links v-if="!selectedItemId">
              <span class="group-links">
                <a href="#" @click="selectGroup(1)" :class="{active: isActiveGroup(1)}">{{ lang('species.group1') }}</a>
                <a href="#" @click="selectGroup(2)" :class="{active: isActiveGroup(2)}">{{ lang('species.group2') }}</a>
                <a href="#" @click="selectGroup(3)" :class="{active: isActiveGroup(3)}">{{ lang('species.group3') }}</a>
                <a href="#" @click="selectGroup(4)" :class="{active: isActiveGroup(4)}">{{ lang('species.group4') }}</a>
              </span>
            </template>

        </navigation-bar>

        <div
                v-for="page in allPages"
                :key="page.id"
                class="full-slider-container cards-container initial-right"
                :class="[getAnimationState(page)]"
        >

            <info-item
                    v-for="item in page.items"
                    v-if="getAnimationState(page)"
                    :key="page.id + '-' + item.id"
                    :item="item.getTranslatedItem(selectedLanguage)"
                    :is-selected="isItemSelected(item)"
                    @close="closeItem"
                    @map="openMapModal"
            />

        </div>

        <div class="arrow-r" v-if="hasNextPage" @click="selectNextPage">
            <img src="@images/chevron-right.svg" alt="">
        </div>
        <div class="arrow-l" v-if="hasPrevPage" @click="selectPrevPage">
            <img src="@images/chevron-left.svg" alt="">
        </div>

        <ul class="footer" v-if="pages.length > 1">
            <li
                    v-for="page in pages"
                    :key="'ul-' + page.id"
                    :class="{active: isActivePage(page)}"
                    @click="selectPage(page)"
            ></li>

        </ul>

        <div class="back-filter"
             @click="selectGroup(null)"
             v-if="!selectedItemId && !isActiveGroup(null)">
            <img src="@images/arrow-left.svg" alt="">
            <span>{{ lang('species.mainFilterButton') }}</span>
        </div>

        <navigation-modal
                v-if="isMapModalOpen"
                :selected-item-id="parseInt(selectedItemId)"
                :items="allItems"
                @close="closeMapModal"
                @select="selectItemFromModal"
        />

        <div class="map-button info-map" @click="openMapModal">
            <img src="@images/map.svg" alt="">
            <span>{{ lang('species.map') }}</span>
        </div>

        <div v-if="isBackButtonVisible && !selectedItemId && isActiveGroup(null)" class="back-filter"
             @click="navigateToMain">
            <img src="@images/arrow-left.svg" alt="">
            <span>{{ lang('common.back') }}</span>
        </div>

    </div>
</template>