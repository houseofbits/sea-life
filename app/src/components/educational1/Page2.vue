<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";
import InputHandlerService from "@src/services/InputHandlerService";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailList from "@src/composables/DetailList";
import DetailListItem from "@src/structures/DetailListItem";
import InfoItem from "@src/components/InfoItem.vue";
import DetailTranslations from "@src/composables/DetailTranslations";
const {lang} = DetailTranslations();

const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);
const species = ref<DetailListItem[]>([]);

const {
    isItemSelected,
    selectItem,
    closeItem,
    selectedItemId
} = InfoItemsListComposable();

const {
    findItemByIdentifier,
    detailContent
} = DetailList();

const isSpeciesSelected = computed(() => {
    return !!selectedItemId.value;
});

function initContent(): void {
    let item = findItemByIdentifier("3");
    item ? species.value.push(item) : null;

    item = findItemByIdentifier("22");
    item ? species.value.push(item) : null;

    item = findItemByIdentifier("5");
    item ? species.value.push(item) : null;
}

watch(() => detailContent.value, (value) => {
    initContent();
});

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
    } else {
        active1.value = false;
    }
});

function prevPage(): void {
    emit('prev');
}

function selectItemLocal(itemId: number): void {
    selectItem(itemId);
    const selectedItem = species.value.find((item: DetailListItem) => item.id == itemId);
    if (selectedItem) {
        emit('show-detail', true, selectedItem);
    }
}

function closeItemLocal(): void {
    closeItem();
    emit('show-detail', false, null);
}

onMounted(() => {
    initContent();

    const input = new InputHandlerService(document.querySelector('.edu1-page2-species-block'));
    input.onSelectItem(selectItemLocal);
});

</script>
<template>

    <div class="edu1-information-block page2-position">
        <div class="small-header">{{ lang('edu1.page2.title') }}</div>

        <div class="text-block" v-html="lang('edu1.page2.text')" />

        <div class="mb40">
            <div class="card numeric-row">
                <div class="number">{{ lang('edu1.page2.subtitle1.value') }}</div>
                <div class="text">{{ lang('edu1.page2.subtitle1') }}</div>
            </div>

            <div class="numeric-row-half">
                <div class="line-l"></div>
                <div class="line-r"></div>
            </div>

            <div class="numeric-row-half">
                <div class="card numeric-row">
                    <div class="number">{{ lang('edu1.page2.subtitle2.value') }}</div>
                    <div class="text">{{ lang('edu1.page2.subtitle2') }}</div>
                </div>

                <div class="card numeric-row">
                    <div class="number">{{ lang('edu1.page2.subtitle3.value') }}</div>
                    <div class="text">{{ lang('edu1.page2.subtitle3') }}</div>
                </div>
            </div>

            <div class="numeric-row-half">
                <div class="line-l"></div>
            </div>

            <div class="numeric-row-half">
                <div class="card numeric-row">
                    <div class="number">{{ lang('edu1.page2.subtitle4.value') }}</div>
                    <div class="text">{{ lang('edu1.page2.subtitle4') }}</div>
                </div>
            </div>
        </div>

        <div class="note">{{ lang('edu1.page2.note') }}</div>
    </div>

    <div class="content-1080p edu1-page2-species-block">
        <InfoItem
            v-for="item in species"
            class="edu1-page2-species"
            :item="item"
            :is-selected="isItemSelected(item)"
            :is-map-visible="false"
            :card-width="308"
            :card-height="240"
            @close="closeItemLocal"
        />
    </div>

    <div v-if="!isSpeciesSelected" class="page-navigation-link horizontal right" @click="emit('next')">
        <span>{{ lang('common.continue') }}</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

    <div v-if="!isSpeciesSelected" class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>{{ lang('common.back') }}</span>
    </div>

</template>