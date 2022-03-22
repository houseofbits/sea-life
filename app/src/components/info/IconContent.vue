<script setup lang="ts">
import DetailListItem from "@src/structures/DetailListItem";

const props = defineProps({
  item: {
    type: DetailListItem,
    required: true
  }
});
</script>
<template>
  <div class="icon-content" :data-item-id="item.id">
    <h1>{{ item.title }}</h1>
    <em v-html="item.latinTitle"/>
    <template v-if="Array.isArray(item.identifier)">
      <span class="identifier">{{ item.identifier[1] }}</span>
      <span class="identifier-2">{{ item.identifier[0] }}</span>
    </template>
    <span v-else class="identifier">{{ item.identifier }}</span>
  </div>
</template>