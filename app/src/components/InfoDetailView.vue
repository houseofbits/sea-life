<script setup lang="ts">
import DetailListItem from "@src/structures/DetailListItem";

defineProps({
  item: {
    type: DetailListItem,
    required: true
  }
});

const emit = defineEmits(['close']);

</script>
<template>
  <div class="detail-view">
    <div class="btn btn-blue m-1 cursor-pointer" @click="emit('close')">Close</div>
  </div>
</template>