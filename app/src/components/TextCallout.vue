<script setup lang="ts">
import {computed} from "vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

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

const style = computed(() => {

  const width = props.config.size.x + 'px';
  const height = props.hidden ? '0' : props.config.size.y + 'px';

  const params: { [key: string]: string } = {
    width,
    height
  };

  if (props.config.type == CalloutTypeEnum.TOP_LEFT || props.config.type == CalloutTypeEnum.TOP_RIGHT) {
    const bottom = 1080 - props.config.position.y - props.config.size.y;
    params['bottom'] = bottom + 'px';
  }
  if (props.config.type == CalloutTypeEnum.BOTTOM_LEFT || props.config.type == CalloutTypeEnum.BOTTOM_RIGHT) {
    params['top'] = props.config.position.y + 'px';
  }
  if (props.config.type == CalloutTypeEnum.TOP_LEFT || props.config.type == CalloutTypeEnum.BOTTOM_LEFT) {
    params['left'] = props.config.position.x + 'px';
  }
  if (props.config.type == CalloutTypeEnum.TOP_RIGHT || props.config.type == CalloutTypeEnum.BOTTOM_RIGHT) {
    const right = 1920 - props.config.size.x - props.config.position.x;
    params['right'] = right + 'px';
  }
  return params;
});
const classes = computed(() => {
  const params: string[] = [];
  if (!props.hidden) {
    params.push('active');
  }
  switch (props.config.type) {
    case CalloutTypeEnum.TOP_LEFT:
      params.push('top-left');
      break;
    case CalloutTypeEnum.TOP_RIGHT:
      params.push('top-right');
      break;
    case CalloutTypeEnum.BOTTOM_LEFT:
      params.push('bottom-left');
      break;
    case CalloutTypeEnum.BOTTOM_RIGHT:
      params.push('bottom-right');
      break;
  }
  return params;
});

</script>
<template>
  <div class="text-callout" :class="classes" :style="style">
    <span>
      <slot/>
    </span>
<!--    <div class="point"></div>-->
  </div>
</template>