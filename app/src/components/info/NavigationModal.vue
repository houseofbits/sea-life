<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import DetailTranslations from "@src/composables/DetailTranslations";
import DetailListItem from "@src/structures/DetailListItem";

const {
  translations,
  selectedLanguage,
} = DetailTranslations();

const emit = defineEmits(['close']);
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

const selectedItem = computed<DetailListItem | null>(() => {
  return props.items.find(
      (item) => {
        const a = item as DetailListItem;
        return a.id === props.selectedItemId as Number;
      }
  ) as DetailListItem || null;
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

onMounted(() => {
  setTimeout(() => isOpen.value = true, 100);
});

</script>
<template>

  <div class="content-1080p navigation-modal">
    <div class="overlay" :class="{active: isOpen}" @click="emit('close')"></div>
    <div class="window" :class="{active: isOpen}">
      <div class="header" @click="emit('close')">
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
        <img src="@images/cross.svg" alt="">
      </div>

      <img
          v-for="item in props.items"
          :key="item.id"
          loading="eager"
          decoding="sync"
          class="map-info-image"
          :class="{active: item.id === props.selectedItemId}"
          :src="'/images/large/' + item.imageFileName"
          :style="item.mapImageTransform.getAsStyle()"
          alt=""
      />

    </div>
  </div>
</template>