<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";
import DetailListItem from "@src/structures/DetailListItem";
import DetailList from "@src/composables/DetailList";
import MapItemStructure from "@src/structures/MapItemStructure";

const {
    translations,
    selectedLanguage,
} = DetailTranslations();

const {
    detailContent
} = DetailList();

const emit = defineEmits(['close', 'select']);
const props = defineProps({
    selectedItemId: {
        type: Number,
        default: null
    },
    items: {
        type: Array,
        required: true,
    }
});

const isOpen = ref(false);
const selectedItemId = ref<number | null>(props.selectedItemId);
const hasChanged = ref(false);

const selectedItem = computed<DetailListItem | null>(() => {
    if (selectedItemId.value !== null) {
        return props.items.find(
            (item) => {
                const a = item as DetailListItem;
                return a.id === selectedItemId.value;
            }
        ) as DetailListItem || null;
    }
    return null;
});

const itemTitle = computed<string>(() => {
    return selectedItem.value
        ? selectedItem.value.getTranslatedItem(selectedLanguage.value).title
        : '';
});

const itemLatinTitle = computed<string>(() => {
    return selectedItem.value
        ? selectedItem.value.getTranslatedItem(selectedLanguage.value).latinTitle
        : '';
});

function selectClose(): void {
    emit('select', selectedItemId.value);
}

function selectItem(itemId: number): void {
    if (props.selectedItemId !== itemId) {
        hasChanged.value = true;
    }
    selectedItemId.value = itemId;
}

function getCircleTransform(mapItem: MapItemStructure): any {
    if (!mapItem.transform.width || !mapItem.transform.height) {
        return null;
    }

    let size = mapItem.transform.width * 1.2;

    size = Math.min(150, size);

    let top = (mapItem.transform.height - size) / 2;
    let left = (mapItem.transform.width - size) / 2;
    return {
        width: size + 'px',
        height: size + 'px',
        top: top + 'px',
        left: left + 'px'
    };
}

onMounted(() => {
    setTimeout(() => isOpen.value = true, 100);
});

</script>
<template>

    <div class="content-1080p navigation-modal">
        <div class="overlay" :class="{active: isOpen}" @click="emit('close')"></div>
        <div class="window" :class="{active: isOpen}">
            <div class="header" @click="emit('close')">

                <template v-if="selectedItem">
                    <div class="identifiers">
                        <template v-if="Array.isArray(selectedItem.identifier)">
                            <div class="large-identifier">
                                {{ selectedItem.identifier[0] }}
                            </div>
                            <div class="large-identifier-2">
                                {{ selectedItem.identifier[1] }}
                            </div>
                        </template>
                        <div v-else class="large-identifier">
                            {{ selectedItem.identifier }}
                        </div>
                    </div>
                    <div class="title">
                        {{ itemTitle }}
                        <span class="latin-title" v-html="itemLatinTitle"></span>
                    </div>
                </template>
                <template v-else>
                    <img class="map" src="@images/map.svg" alt="">
                    <div class="title">{{ translations.map }}</div>
                </template>

                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <div
                    class="map-info-item"
                    v-for="(mapItem, index) in detailContent.mapItems"
                    :key="index"
                    :class="{active: mapItem.itemId === selectedItemId}"
                    :style="mapItem.transform.getAsStyle()"
            >
                <div class="circle-bg" :style="getCircleTransform(mapItem)"></div>

                <img
                        loading="eager"
                        decoding="sync"
                        :src="'/images/' + mapItem.imageFileName"
                        :alt="mapItem.itemId"
                        @click="selectItem(mapItem.itemId)"
                >

                <div class="circle" :style="getCircleTransform(mapItem)"></div>
            </div>

            <div v-if="hasChanged" class="learn-more-button" @click="selectClose">
                {{ translations.learnMoreButton }}
            </div>

        </div>
    </div>
</template>