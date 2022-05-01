<script setup lang="ts">
import {onMounted, ref} from 'vue';
import DetailListItem from "@src/structures/DetailListItem";
import DetailTranslations from "@src/composables/DetailTranslations";

const props = defineProps({
  item: {
    type: DetailListItem,
    required: true
  }
});

const emit = defineEmits(['close', 'map']);

const active = ref(false);
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

function close(): void {
  emit('close');
  active.value = false;
}

function getStyle(id: number): any {
  if (selectedSection.value === id) {
    const h = refs.value[id]?.scrollHeight || 200;
    return {
      height: h + 'px',
      marginBottom: '20px',
      marginTop: '-16px'
    };
  }
  return {
    height: 0,
    marginBottom: 0
  };
}

function isSectionSelected(id: number): boolean {
  return selectedSection.value === id;
}

function getFactStyle(): any {
  const bottom = 1080
      - (props.item.factTextTransform.top || 200)
      - (props.item.factTextTransform.height || 250);

  const width = props.item.factTextTransform.width || 400;
  const left = props.item.factTextTransform.left || 500;

  if (active.value) {
    return {
      bottom: bottom + 'px',
      left: left + 'px',
      height: props.item.factTextTransform.height + 'px',
      width: width + 'px'
    };
  }

  return {
    bottom: bottom + 'px',
    left: left + 'px',
    height: 0,
    width: width + 'px'
  };
}

function getFamilyStyle(): any {
  const top = props.item.familyTextTransform.top || 500;
  const left = props.item.familyTextTransform.left || 150;
  const height = props.item.familyTextTransform.height || 200;
  const width = props.item.familyTextTransform.width || 500;

  if (active.value) {
    return {
      top: top + 'px',
      left: left + 'px',
      height: height + 'px',
      width: width + 'px'
    };
  }

  return {
    top: top + 'px',
    left: left + 'px',
    height: 0,
    width: width + 'px'
  };
}

const {
  translations
} = DetailTranslations();

onMounted(() => {
  setTimeout(() => {
    active.value = true;
    select(0);
  }, 300);
});

</script>
<template>
  <div class="content-1080p detail-view" :class="{active: active}">

    <div class="family-detail" :style="getFamilyStyle()">
      <span class="latin-name" v-html="item.latinTitle"/>
      <span class="latin-detail"><strong>{{ translations.order }}: </strong><em v-html="item.order"/></span>
      <span class="latin-detail"><strong>{{ translations.family }}: </strong><em v-html="item.family"/></span>
    </div>

    <div class="fact-detail" :style="getFactStyle()">
      <span v-html="item.fact"/>
    </div>

    <div class="info-detail">
      <div class="detail-collapsible" v-for="(content, index) in item.content" @click="select(index)">
        <div class="detail-header"><span>{{ content.title }}</span>
          <img v-if="isSectionSelected(index)" src="@images/chevron-up.svg" alt="">
          <img v-else src="@images/chevron-down.svg" alt="">
        </div>
        <div class="detail-text" :style="getStyle(index)" :ref="el => setElem(el, index)" v-html="content.content"/>
      </div>
    </div>

    <div class="info-identifier-section">
      <div class="map-button" @click="emit('map')">
        <img src="@images/map.svg" alt="">
        <span>{{ translations.map }}</span>
      </div>

      <template v-if="Array.isArray(item.identifier)">
        <div class="large-identifier">
          {{ item.identifier[0] }}
        </div>
        <div class="large-identifier-2">
          {{ item.identifier[1] }}
        </div>
      </template>
      <div v-else class="large-identifier">
        {{ item.identifier }}
      </div>
    </div>

    <div class="back-filter" @click="close">
      <img src="@images/arrow-left.svg" alt="">
      <span>{{ translations.backButton }}</span>
    </div>

  </div>
</template>