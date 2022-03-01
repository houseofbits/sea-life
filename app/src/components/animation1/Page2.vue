<script setup lang="ts">
const emit = defineEmits(['next', 'restart']);

</script>
<template>

  Welcome to page 2

  <div class="back-filter" @click="emit('restart')">
    <img src="@images/arrow-left.svg" alt="">
    <span>Page 2</span>
  </div>

</template>