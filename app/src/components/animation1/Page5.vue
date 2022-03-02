<script setup lang="ts">
const emit = defineEmits(['next', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});
</script>
<template>

  <div class="back-filter">
    <img src="@images/arrow-left.svg" alt="">
    <span>Page 5</span>
  </div>

</template>