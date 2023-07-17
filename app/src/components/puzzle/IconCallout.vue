<script setup lang="ts">
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";

const props = defineProps({
  config: {
    type: CalloutConfigStructure,
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <target-callout :config="props.config" :hidden="props.hidden">
    <div class="icon">
      <span>?</span>
    </div>
  </target-callout>
</template>