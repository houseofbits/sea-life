<script setup lang="ts">

const emit = defineEmits(['select']);

const props = defineProps({
  languages: {
    type: Array,
    default: []
  },
  selectedLanguage: {
    type: String,
    default: 'LV'
  },
});

function isLanguageActive(lang: string): boolean {
  return lang === props.selectedLanguage;
}

</script>
<template>
  <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <li v-for="lang in props.languages" class="mr-2">
      <span @click="emit('select', lang)"
            :class="{'language-active': isLanguageActive(lang)}"
            class="cursor-pointer inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
        {{ lang.toUpperCase() }}
      </span>
    </li>
  </ul>
</template>