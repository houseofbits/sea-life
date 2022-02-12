<script setup lang="ts">

import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";

const callouts = [
  new CalloutConfigStructure({
    position: new Vector2(308, 638),
    size: new Vector2(300, 200),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),

  new CalloutConfigStructure({
    position: new Vector2(708, 638),
    size: new Vector2(300, 200),
    type: CalloutTypeEnum.TOP_LEFT
  }),
];

</script>
<template>

  <target-callout
      :config="callouts[0]"
      :hidden="false">
    <template #text>
      sdfasd fasdf asdf asdf asdfsadfasdf asdf sadfasd  fasd
    </template>
  </target-callout>

  <target-callout
      :config="callouts[1]"
      :hidden="false">
    <template #text>
      sdfasd fasdf asdf asdf asdfsadfasdf asdf sadfasd  fasd
    </template>
  </target-callout>




</template>