<script setup lang="ts">
import * as _ from "lodash";
import DetailItemContent from "@src/structures/DetailItemContent";
import {onMounted, reactive, watch} from "vue";

const emit = defineEmits(['update:content']);

const props = defineProps({
  content: {
    type: [Object, DetailItemContent],
    required: true
  }
});

interface FormValuesInterface {
  title: string | null,
  content: string | null,
}

const formValues = reactive<FormValuesInterface>({
  title: null,
  content: null,
});

function setValues() {
  formValues.title = props.content.title;
  formValues.content = props.content.content;
}

onMounted(() => {
  setValues();
});

watch(() => props.content, () => {
  setValues();
});

watch(() => formValues, () => {
  const content = _.cloneDeep(props.content);
  content.title = formValues.title;
  content.content = formValues.content;

  emit('update:content', content);
}, {deep: true});

</script>
<template>
  <hr class="mb-6"/>
  <div class="mb-3 w-1/2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      <span>Title</span>
      <input v-model="formValues.title" type="text"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </label>
  </div>
  <div class="mb-6 w-full">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      <span>Content</span>
      <textarea
          v-model="formValues.content"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </textarea>
    </label>
  </div>
</template>