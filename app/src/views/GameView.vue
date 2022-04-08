<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {onMounted} from "vue";
import TimeoutService from "@src/services/TimeoutService";
import {useRouter} from "vue-router";

const router = useRouter();

onMounted(() => {
  TimeoutService.registerCallback(() => {
    router.push('/game');
  });
});

</script>
<template>
  <div class="content-1080p bg-white">

    <navigation-bar>
      <span>Interaktīvā jūra</span>
    </navigation-bar>

    <img class="anim1-info-bg1" src="@images/anim1-info-bg1.svg" alt="">

    <router-link to="/game/puzzle" class="expandable-card card1">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main1.png" alt="">
      </div>

      <div class="card-title">Saliec mencu</div>
      <div class="card-subtitle">Pārbaudi savas zināšanas mencas uzbūvē</div>
    </router-link>

    <router-link to="/game/anim1" class="expandable-card card2">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main2.png" alt="">
      </div>

      <div class="card-title">Attīstība</div>
      <div class="card-subtitle">Uzzini vairāk par jūtas iemītnieku attīstību un vairošanos</div>
    </router-link>

    <router-link to="/game/anim2" class="expandable-card card3">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main3.png" alt="">
      </div>

      <div class="card-title">Stagara riests</div>
      <div class="card-subtitle">Stagara romantiskais vairošanās stāsts</div>
    </router-link>

    <router-view/>
  </div>
</template>