<script setup lang="ts">
import * as _ from "lodash";
import DetailListItem from "@src/structures/DetailListItem";
import {onMounted, reactive, watch, ref, computed} from "vue";
import ItemFormContentSection from "@src/components/editor/ItemFormContentSection.vue";
import EditItemFormValuesStructure from "@src/structures/EditItemFormValuesStructure";
import ItemUpdateService from "@src/services/ItemUpdateService";
import EditorGlobalState from "@src/composables/EditorGlobalState";

const emit = defineEmits(['update:item']);

const props = defineProps({
  item: {
    type: DetailListItem,
    required: true
  },
  selectedLanguage: {
    type: String,
    default: 'lv'
  },
  isBaseLanguage: {
    type: Boolean,
    default: true
  }
});

const isSuccess = ref(false);
const error = ref<string | null>(null);
const initialData = ref<EditItemFormValuesStructure | null>(null);
const formValues = reactive<EditItemFormValuesStructure>(new EditItemFormValuesStructure());
let successMessageTimeout: any = null;

function setSaveSuccess(): void {
  if (  successMessageTimeout) {
    clearTimeout(successMessageTimeout);
  }
  isSuccess.value = true;
  successMessageTimeout = setTimeout(() => {
    isSuccess.value = false;
  }, 2000);
}

function selectLanguage(language: string | null = null) {
  if (props.isBaseLanguage) {
    formValues.identifier = props.item.identifier;
    formValues.title = props.item.title;
    formValues.latinTitle = props.item.latinTitle;
    formValues.order = props.item.order;
    formValues.family = props.item.family;
    formValues.fact = props.item.fact;
    formValues.videoUrl = props.item.videoFileName;
    formValues.content = _.cloneDeep(props.item.content);
  } else {
    const langItem = props.item.getLanguageItem(props.selectedLanguage);
    if (langItem) {
      formValues.title = langItem.title ?? null;
      formValues.order = langItem.order ?? null;
      formValues.family = langItem.family ?? null;
      formValues.fact = langItem.fact ?? null;
      formValues.videoUrl = langItem.videoFileName ?? null;
      formValues.content = _.cloneDeep(langItem.content ?? []);
    }
  }

  initialData.value = new EditItemFormValuesStructure(formValues);
}

const {
  setUnsavedChangesPending,
  isLoading,
  setLoading
} = EditorGlobalState();

const isSaveDisabled = computed<boolean>(() => {
  const hasNotChanged = _.isEqual(initialData.value, formValues);
  setUnsavedChangesPending(!hasNotChanged);
  return hasNotChanged || isLoading.value;
});

onMounted(() => {
  error.value = null;
  selectLanguage(props.selectedLanguage);
});

watch(() => props.item, () => {
  error.value = null;
  selectLanguage(props.selectedLanguage);
});

watch(() => props.selectedLanguage, () => {
  error.value = null;
  selectLanguage(props.selectedLanguage);
});

async function updateData(): Promise<any> {
  error.value = null;
  setLoading(true);
  try {
    await ItemUpdateService.update(props.item.sourceFileName, props.isBaseLanguage, props.selectedLanguage, formValues);
    updateParentItem();
    setUnsavedChangesPending(false);
    initialData.value = new EditItemFormValuesStructure(formValues);
    setSaveSuccess();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    setLoading(false);
  }
}

function updateParentItem(): void {
  const item = _.cloneDeep(props.item);

  if (props.isBaseLanguage) {
    item.identifier = formValues.identifier;
    item.title = formValues.title;
    item.latinTitle = formValues.latinTitle;
    item.order = formValues.order;
    item.family = formValues.family;
    item.fact = formValues.fact;
    item.videoFileName = formValues.videoUrl;
    item.content = _.cloneDeep(formValues.content);
  } else {
    const langItem = item.getLanguageItem(props.selectedLanguage as string);
    if (langItem) {
      langItem.title = formValues.title;
      langItem.order = formValues.order;
      langItem.family = formValues.family;
      langItem.fact = formValues.fact;
      langItem.videoFileName = formValues.videoUrl;
      langItem.content = _.cloneDeep(formValues.content);
    }
  }

  emit('update:item', item);
}

</script>
<template>
  <div class="p-6 flex flex-col w-full">

    <div v-if="error" id="alert-border-2" class="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
         role="alert">
      <svg class="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"></path>
      </svg>
      <div class="ml-3 text-sm font-medium text-red-700">
        Failed to save data. {{ error }}
      </div>
    </div>

    <div v-if="isSuccess" id="success-border-2" class="flex p-4 mb-4 bg-green-100 border-t-4 border-green-500 dark:bg-green-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 512 512">
        <path
            d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/>
      </svg>

      <div class="ml-3 text-sm font-medium text-green-700">
        {{ props.item.title }} - {{ selectedLanguage.toUpperCase() }} updated
      </div>
    </div>

    <div class="flex w-full justify-between mb-6">
      <h3>{{ props.item.title }} / {{ selectedLanguage.toUpperCase() }} ({{
          props.isBaseLanguage ? "Default language" : "Additional language"
        }})</h3>

      <button :disabled="isSaveDisabled" @click="updateData">
        <svg
            class="flex-shrink-0 w-6 h-6 transition duration-75 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path
              d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/>
        </svg>
        <span>Save</span>
      </button>
    </div>

    <div v-if="props.isBaseLanguage" class="mb-3 w-1/5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Identifier</span>
        <input v-model="formValues.identifier"
               type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <div class="mb-3 w-1/2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Title</span>
        <input v-model="formValues.title" type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <div v-if="props.isBaseLanguage" class="mb-3 w-1/2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Latin title</span>
        <input v-model="formValues.latinTitle" type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <div class="mb-3 w-1/2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Order</span>
        <input v-model="formValues.order" type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <div class="mb-3 w-1/2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Family</span>
        <input v-model="formValues.family" type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <div class="mb-3 w-full">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Fact</span>
        <textarea v-model="formValues.fact"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </textarea>
      </label>
    </div>

    <div v-if="props.isBaseLanguage" class="w-full">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span>Video file</span>
        <input v-model="formValues.videoUrl" type="text"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </label>
    </div>

    <h3 class="mt-6">Content</h3>

    <item-form-content-section v-for="(content, index) in formValues.content"
                               v-model:content="formValues.content[index]"/>

  </div>
</template>