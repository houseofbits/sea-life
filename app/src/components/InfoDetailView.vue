<script setup lang="ts">
import {ref} from 'vue';
import DetailListItem from "@src/structures/DetailListItem";

defineProps({
  item: {
    type: DetailListItem,
    required: true
  }
});

const emit = defineEmits(['close']);

const selectedSection = ref<number | null>(null);
const refs = ref<Array<Element | null>>([null, null, null, null, null, null]);

function setElem(el: any, index: number): void {
  if (el) {
    refs.value[index] = el;
  }
}

function select(val: number): void {
  selectedSection.value = val;
}

function getStyle(id: number): any {
  if (selectedSection.value === id) {
    const h = refs.value[id]?.scrollHeight || 200;
    return {
      height: h + 'px',
      marginBottom: '20px',
    };
  }
  return {
    height: 0,
    marginBottom: 0
  };
}

</script>
<template>
  <div class="content-1080p detail-view">

    <div class="back-button" @click="emit('close')">&lt;- Atpakaļ</div>

    <div class="family-detail">
      <em>{{ item.latinTitle }}</em>
      <span><strong>Kārta: </strong><em>{{ item.order }}</em></span>
      <span><strong>Dzimta: </strong><em>{{ item.family }}</em></span>
    </div>

    <div class="fact-detail">
      <span>{{ item.fact }}</span>
    </div>

    <div class="info-detail">
      <div class="detail-collapsible" v-for="(content, index) in item.content" @click="select(index)">
        <div class="detail-header">{{ content.title }}</div>
        <div class="detail-text" :style="getStyle(index)" :ref="el => setElem(el, index)">
          {{ content.content }}
        </div>
      </div>
    </div>

    <div class="large-identifier">
      {{ item.identifier }}
    </div>

  </div>
</template>