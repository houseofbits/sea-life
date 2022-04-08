<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const emit = defineEmits(['next', 'prev', 'restart']);
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const mainVideo = ref<HTMLMediaElement | null>(null);
const active1 = ref(false);
const active2 = ref(false);
const continueBounce = ref(false);

function stopVideo(): void {
  if (mainVideo.value) {
    mainVideo.value.pause();
    mainVideo.value.currentTime = 0;
  }
}

watch(() => props.isActive, (value: boolean) => {
  if (mainVideo.value) {
    if (value) {
      mainVideo.value.play();
      setTimeout(() => active1.value = true, 1000);
      setTimeout(() => active2.value = true, 12000);
      setTimeout(() => continueBounce.value = true, 14000);
    } else {
      stopVideo();
    }
  }
});

onMounted(() => {
  if (mainVideo.value) {
    mainVideo.value.play();
  }
});

</script>
<template>
  <div class="content-1080p">
    <video width="1920" height="1080" muted loop ref="mainVideo">
      <source src="/video/stagars/4_Matite.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div class="text-collapse-horizontal page4-text1" :class="{active: active1}">
    <div>Kad ligzda gatava, tēviņš ar <strong>dejas palīdzību</strong> ievilina tajā mātīti un tā <strong>iznērš ap
      100</strong> gaiši dzeltenus ikriņus.
    </div>
  </div>

  <div class="text-collapse-horizontal page4-text2" :class="{active: active2}">
    <div>Tad tēviņs mātīti <strong>padzen</strong>, apaugļo ikriņus, <strong>un sāk vilināt jaunu</strong> mātīti. Viena
      tēviņa <strong>ligzdā</strong> bieži savus ikriņus atstaj <strong>trīs vai četras mātītes.</strong></div>
  </div>

  <div class="page-navigation-link horizontal right" @click="emit('next')">
    <span>Turpināt</span>
    <img src="@images/chevron-right.svg" :class="{'bounce-right-anim':continueBounce}" alt="">
  </div>

</template>