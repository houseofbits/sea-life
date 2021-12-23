<script setup lang="ts">
import InfoDetailView from "@src/components/InfoDetailView.vue";
import DetailListItem from "@src/structures/DetailListItem";
const emit = defineEmits(['close', 'select']);
const props = defineProps({
  item: {
    type: DetailListItem,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

function getImageTransform(item: DetailListItem): string {
  return props.isSelected ? item.detailTransform : item.iconTransform;
}
</script>
<template>
  <div
      class="item"
      :class="{active: props.isSelected}"
  >
    <div class="icon-content" v-if="!props.isSelected" @click="emit('select', item.id)">
      <h1>{{ item.title }}</h1>
      <em>{{ item.latinTitle }}</em>
      <span class="identifier">{{ item.identifier }}</span>
    </div>
    <img
        width="100"
        :src="'/images/' + item.imageFileName"
        :style="{transform: getImageTransform(item)}"
        alt=""
    />
    <info-detail-view v-if="props.isSelected" :item="item" @close="emit('close')"/>
  </div>
</template>