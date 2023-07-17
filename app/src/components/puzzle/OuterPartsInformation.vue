<script setup lang="ts">
import TextCallout from "@src/components/TextCallout.vue";
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import {onMounted, ref} from "vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();

const text = [
    'puzzle.outer.info1',
    'puzzle.outer.info2',
    'puzzle.outer.info3',
    'puzzle.outer.info4',
    'puzzle.outer.info5',
    'puzzle.outer.info6',
    'puzzle.outer.info7',
    'puzzle.outer.info8',
    'puzzle.outer.info9',
    'puzzle.outer.info10',
    'puzzle.outer.info11'
];

const callouts = [
  new CalloutConfigStructure({
    position: new Vector2(308, 638),
    size: new Vector2(300, 200),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(272, 409),
    size: new Vector2(200, 125),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(378, 300),
    size: new Vector2(355, 185),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(501, 693),
    size: new Vector2(385, 250),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(726, 738),
    size: new Vector2(395, 135),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(645, 820),
    size: new Vector2(416, 100),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(1321, 703),
    size: new Vector2(395, 100),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(1567, 311),
    size: new Vector2(285, 141),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(1069, 310),
    size: new Vector2(393, 60),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(889, 274),
    size: new Vector2(625, 130),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(814, 752),
    size: new Vector2(607, 200),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
];

const pairingExclude: { [key: number]: number[] } = {
  0: [3],
  1: [2],
  2: [1],
  3: [0, 4, 5, 10],
  4: [10],
  5: [3, 4, 10],
  6: [],
  7: [],
  8: [9],
  9: [8],
  10: [3, 4, 5],
};

const calloutVisibilityStack = ref(new Array<number>());

function openInfoCallout(id: number): void {
  if (!calloutVisibilityStack.value.includes(id)) {
    calloutVisibilityStack.value.push(id);
  }

  while (calloutVisibilityStack.value.length > 3) {
    calloutVisibilityStack.value.shift();
  }

  for (const exclude of pairingExclude[id]) {
    const existingIndex = calloutVisibilityStack.value.findIndex((val: number) => val === exclude);
    if (existingIndex >= 0) {
      calloutVisibilityStack.value.splice(existingIndex, 1);
    }
  }
}

function isVisible(id: number): boolean {
  return calloutVisibilityStack.value.includes(id);
}

onMounted(() => {
  setTimeout(() => {
    openInfoCallout(0);
    openInfoCallout(7);
    openInfoCallout(8);
  }, 400);
});

</script>
<template>

  <text-callout
      v-for="(config, index) in callouts"
      :config="config"
      :hidden="!isVisible(index)"
      :is-point-visible="true"
  >
    {{ lang(text[index]) }}
  </text-callout>

  <svg style="z-index:1000; position: absolute; left: 261px; top: 324px;" width="1417" height="507"
       viewBox="0 0 1417 507">
    <path @click="openInfoCallout(0)" d="M93.5 262L0.5 255.5V302L133 353.5L192.5 283.5L93.5 262Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(1)" d="M70.5 187L0.5 214V255.5L94 263L70.5 187Z"
          fill-opacity="0"
          fill="black"/>
    <path @click="openInfoCallout(2)" d="M147.5 147.5L71 186.5L94 262.5L193.5 283V201.5L147.5 147.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(3)"
          d="M192.5 282.5L150.5 334L133 353.5L243.5 375L314 344L335 304L349.5 221L305.5 180L254.5 173L192.5 201V282.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(4)"
          d="M442 217.5L346 242L335.5 304L417 341.5L462 320.5L508.5 254L513 232.5L491.5 217.5H442Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(5)"
          d="M382.5 374L314 344L244.5 374L294 396L374.5 480L436.5 507L454 489.5L439 447.5L382.5 374Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(6)"
          d="M995 295.5L903 333L973 377.5L1042 385L1097 349.5L1127 317V286.5L1100 268L995 295.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(7)"
          d="M1163.5 225.5L1177.5 168.5L1346 105L1397.5 114.5L1417 251.5L1397.5 347L1327.5 351.5L1217 311L1167.5 280L1163.5 225.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(8)"
          d="M439.5 95H368.5L396.5 59.5L475 1H529L596 42L608 78.5H633.5L726.5 14L780.5 27L885 102H910L1003.5 56L1049 59.5L1110.5 125V155.5L1098.5 182.5L897.5 138L726.5 117L585.5 95H439.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(9)"
          d="M395.5 194.5L376.5 168L438.5 158L537.5 151.5H601L694 174.5L798 206.5L957 219.5L1163 215V243L1010.5 247.5L906 243L814 235.5L694 206.5L591.5 181.5H489.5L395.5 194.5Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(10)"
          d="M258.5 166L241.5 137.5L371 96H586.5L893.5 138L1096.5 183L1163.5 200.5L1161 213.5L956.5 217.5L794 203L601 147L450.5 155.5L371 166L311 178.5L258.5 166Z"
          fill="black"
          fill-opacity="0"/>
    <path @click="openInfoCallout(10)"
          d="M371 170.5L314 181.5L348 220.5L346 241.5L439.5 217.5H491.5L513.5 236L507 256L461 321L676.5 329L902 333.5L991 296.5L1096.5 267.5L1161 243L1013.5 248L816.5 236L593.5 181.5H491.5L394.5 194.5L371 170.5Z"
          fill="black"
          fill-opacity="0"/>
  </svg>
</template>