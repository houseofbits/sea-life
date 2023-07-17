<script setup lang="ts">
import DetailListItem from "@src/structures/DetailListItem";
import {ref, watch} from "vue";
const emit = defineEmits(['main']);
const props = defineProps({
  item: {
    type: DetailListItem,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

const infoVideo = ref<HTMLMediaElement | null>(null);

watch(() => props.isActive, (value: boolean) => {
  if (infoVideo.value) {
    if (value) {
      infoVideo.value.play();
    } else {
      infoVideo.value.pause();
    }
  }
});

</script>
<template>
    <div class="info-video-1">
      <video muted loop ref="infoVideo" disablePictureInPicture>
        <source :src="props.item.videoFileName" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="page-navigation-link vertical top" @click="$emit('main')">
      <img src="@images/chevron-up.svg" alt="">
      <span>Atpakaļ</span>
    </div>
</template>