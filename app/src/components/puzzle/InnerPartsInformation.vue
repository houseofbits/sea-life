<script setup lang="ts">

import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";
import {onMounted, ref} from "vue";

const text = [
  'Piloriskie piedēkļi izdala gremosanas fermentus, un tajos sakas pārstrādātās barības uzsūkšanās',
  'Anālā atvere tiek izmantota gremošanas galaproduktu, kā arī liekā ūdens izvadīšanai. Vairošanas laikā pa to ārējā vidē izvada dzimumšūnas.',
  'Sirds nodrošina asins kustību asinsvados.',
  'Dzimumdziedzeri veido sievišķās vai vīrišķās dzimumšūnas.',
  'Peldpūslis spēj izplesties un sarauties, nodrošinot zivij spēju mainīt peldēšanas dziļumu.',
  'Muskuļi saraujoties nodrošina zivs kustības.',
  'Žaunās notiek skābekļa uzņemšana.',
  'Aknas attīra asinis no kaitīgām vielām.',
  'Žultspūslī uzkrājas žults, kas piedalās barības sašķelšanā.',
  'Urīnpūslī pirms izvadīšanas uzkrājas urīns',
  'Nieres izvada vielmaiņas galaproduktus',
  'Barības vadā notiek uzņemtās barības sašķelšana.',
  // 'Liesa piedalās organisma imūnsistemas darbībā, noārda organismā iekļuvušos mikroorganismus un noārda novecojušos eritrocītus.',
  // 'Muguras aorta apgādā ar asinīm muskuļus un iekšējos orgānus',
  'Kunģī nokļūst uzņemtā barība. Ir zivju sugas, kurām kunģa nav.'
];

const callouts = [
  new CalloutConfigStructure({
    position: new Vector2(739, 664),
    size: new Vector2(400, 217),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(1064, 712),
    size: new Vector2(411, 191),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(564, 675),
    size: new Vector2(250, 210),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(948, 672),
    size: new Vector2(340, 202),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(855, 275),
    size: new Vector2(433, 310),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(884, 322),
    size: new Vector2(350, 153),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(529, 615),
    size: new Vector2(300, 300),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(675, 712),
    size: new Vector2(315, 136),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(667, 657),
    size: new Vector2(405, 217),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(1039, 651),
    size: new Vector2(400, 210),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(755, 298),
    size: new Vector2(310, 263),
    type: CalloutTypeEnum.TOP_LEFT
  }),
  new CalloutConfigStructure({
    position: new Vector2(586, 605),
    size: new Vector2(310, 290),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
  // new CalloutConfigStructure({
  //   position: new Vector2(864, 710),
  //   size: new Vector2(400, 185),
  //   type: CalloutTypeEnum.BOTTOM_LEFT
  // }),
  // new CalloutConfigStructure({
  //   position: new Vector2(594, 290),
  //   size: new Vector2(340, 275),
  //   type: CalloutTypeEnum.TOP_LEFT
  // }),
  new CalloutConfigStructure({
    position: new Vector2(788, 624),
    size: new Vector2(340, 255),
    type: CalloutTypeEnum.BOTTOM_LEFT
  }),
];

const pairingExclude: { [key: number]: number[] } = {
  0: [1, 2, 3, 7, 8, 9, 11, 12],
  1: [0, 3, 9, 12],
  2: [0, 6, 7, 11, 12, 8],
  3: [0, 1, 7, 8, 9, 12],
  4: [5, 10],
  5: [4, 10],
  6: [2, 11],
  7: [0, 2, 3, 8, 11, 12],
  8: [0, 2, 3, 7, 11, 12],
  9: [0, 1, 3, 12],
  10: [4, 5],
  11: [0, 2, 6, 7, 8, 12],
  12: [0, 1, 3, 9, 11, 7, 8],
};

const calloutVisibilityStack = ref(new Array<number>());

function openInfoCallout(id: number): void {
  console.log('ōpen '+id);
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
    openInfoCallout(6);
    openInfoCallout(5);
    openInfoCallout(12);
  }, 400);
});

</script>
<template>

  <target-callout
      v-for="(config, index) in callouts"
      :config="config"
      :hidden="!isVisible(index)"
      :is-point-visible="true"
  >
    <template #text>{{ text[index] }}</template>
  </target-callout>

  <svg width="1717" style="z-index:1000; position: absolute; left: 101px; top: 115px;" height="951"
       viewBox="0 0 1717 951">
    <path @click="openInfoCallout(0)"
          d="M673.507 527.091H685.127L686.057 543.824H766.469L769.722 560.558L780.413 577.291L717.664 594.024L647.013 595.883L636.322 591.235L593.56 582.404L582.404 570.319L584.728 557.769L582.404 537.317L609.828 543.824L636.322 532.204L650.266 519.654L658.633 523.838V532.204L673.507 527.091Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(1)"
          d="M946.813 603.321L959.363 591.7L979.35 584.263L1022.11 580.08L1041.17 608.898L1020.25 633.068L957.969 635.857L946.813 603.321Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(2)"
          d="M501.373 524.05L476.706 530.911L432.271 532.669L416.468 545.219L375.564 550.332L439.243 584.263L489.576 605.851L499.228 563.631L511.561 537.244L512.683 520.584L501.373 524.05Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(3)"
          d="M790.4 520.119L777.159 516.4L772.168 525.632L767.863 543.824L770.187 558.698L779.483 576.361L790.174 580.544L803.269 585.268L817.747 588.434H863.863L900.327 585.268L915.341 591.073L934.645 610.072L942.152 605.322L940.544 596.878L916.602 561.022L904.052 544.754L887.457 530.382L859.895 523.373H832.006L805.048 525.632L790.4 520.119Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(4)"
          d="M905.91 491.766L923.108 515.472L910.094 526.627L898.473 538.712L887.318 530.81L858.965 522.909H831.076L804.582 524.768L776.694 515.472L722.776 499.668L694.423 489.907L647.012 486.189L592.165 483.4L534.064 471.78L523.838 465.272V457.371L529.881 453.652H548.473L592.165 452.258H666.07H735.791H796.216L839.908 462.019L905.91 491.766Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(5)"
          d="M639.183 329.841L646.154 301.87H745.892L852.602 316.119L878.341 334.59L891.21 373.643L902.471 424.307L938.398 470.749L902.471 473.387H869.761L841.877 455.972L823.645 424.307L777.53 412.169L686.371 418.502L633.821 415.335L613.98 402.142V373.643L639.183 329.841Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(6)"
          d="M416.113 545.162L374.823 549.912L337.823 531.44L356.591 509.275L380.185 463.889L383.403 410.586L397.345 407.42L443.427 417.398L464.91 469.166L455.257 516.136L440.779 527.218L416.113 545.162Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(7)"
          d="M552.851 549.382L554.459 527.217V516.867L544.29 514.023H528.184L512.633 520.356L511.025 536.717L499.228 565.215L490.112 605.324L588.242 629.6L595.749 607.962L591.459 579.992L583.952 571.548L572.155 565.215L558.213 562.048L554.459 558.882L552.851 549.382Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(8)"
          d="M565.72 519.3L554.459 517.189V528.272L552.85 548.854L554.459 559.937L558.212 562.048L571.618 564.687L584.488 570.492V557.769L582.879 545.16L581.27 535.133L577.517 528.272L565.72 519.3Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(9)"
          d="M951.927 578.686L959.829 592.166L979.351 584.264L977.956 567.996L964.941 539.178L947.743 511.289L923.573 515.937L910.094 527.093L899.403 539.178L917.996 563.348L951.927 578.686Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(10)"
          d="M518.26 441.103L508.035 447.145V453.652L518.26 457.371H523.838L529.416 453.652L594.489 452.258H685.591H796.68L839.907 462.019L904.981 491.302L923.108 515.937L946.813 509.894L912.417 473.174H869.19L842.231 455.512L832.471 438.314L802.258 429.482H724.635H648.871L574.967 433.201L518.26 441.103Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(11)"
          d="M464.808 468.991L457.371 451.328L478.752 455.047L523.374 464.808L533.6 471.78L592.166 482.935L609.364 484.33L603.321 524.303L576.827 528.022L565.671 519.19L554.981 517.331L544.29 514.077H528.022L512.218 521.514L476.893 531.74H434.13L455.047 515.472L464.808 468.991Z"
          fill="black" fill-opacity="0"/>
    <path @click="openInfoCallout(12)"
          d="M602.856 523.839L577.756 528.022L581.474 536.389L609.828 542.896L635.392 532.205L648.872 518.261L659.098 523.839V532.205L672.577 527.093H684.662L686.521 542.896H767.398L772.511 528.022L778.554 515.472L693.958 489.908L648.872 486.189L609.828 484.33L602.856 523.839Z"
          fill="black" fill-opacity="0"/>

  </svg>

</template>