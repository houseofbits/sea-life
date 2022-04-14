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

      <div class="card-title">Kā veidota menca?</div>
      <div class="card-subtitle">Saliec mencu</div>
    </router-link>

    <router-link to="/game/anim1" class="expandable-card card2">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main2.png" alt="">
      </div>

      <div class="card-title">Kā izaug zivis?</div>
      <div class="card-subtitle">Ieskaties un pēti zivju vairošanos un attīstību</div>
    </router-link>

    <router-link to="/game/anim2" class="expandable-card card3">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main3.png" alt="">
      </div>

      <div class="card-title">Kā riesto stagari?</div>
      <div class="card-subtitle">Stagara romantiskais vairošanās stāsts</div>
    </router-link>

    <router-view/>
  </div>
</template>