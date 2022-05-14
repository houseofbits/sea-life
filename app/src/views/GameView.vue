<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {onMounted, ref} from "vue";
import TimeoutService from "@src/services/TimeoutService";
import {useRouter} from "vue-router";
import DetailListItem from "@src/structures/DetailListItem";
import DetailViewService from "@src/services/DetailViewService";
import DetailContentStructure from "@src/structures/DetailContentStructure";
import DetailList from "@src/composables/DetailList";

const router = useRouter();

const {
  detailContent
} = DetailList();

const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  if (!detailContent.value) {
    DetailViewService.fetchAllContent().then((result: DetailContentStructure) => {
      detailContent.value = result;
    }).catch(e => {
      errorMessage.value = e.message;
    }).finally(() => {
      isLoading.value = false;
    });
  } else {
    isLoading.value = false;
  }

  TimeoutService.registerCallback(() => {
    router.push('/game');
  });
});

</script>
<template>
  <div v-show="!isLoading" class="content-1080p bg-white">

    <navigation-bar>
      <span>Baltijas jūra un tās iemītnieki</span>
    </navigation-bar>

    <img class="anim1-info-bg1" src="@images/anim1-info-bg1.svg" alt="">

    <router-link to="/info" class="expandable-card start-screen card1">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main4.png" alt="">
      </div>

      <div class="card-title">Baltijas jūras iemītnieki</div>
      <div class="card-subtitle">Izpēti vitrīnās izvietoto sugu aprakstus</div>
    </router-link>

    <router-link to="/game/puzzle" class="expandable-card start-screen card2">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main1.png" alt="">
      </div>

      <div class="card-title">Kā veidota menca?</div>
      <div class="card-subtitle">Saliec mencu</div>
    </router-link>

    <router-link to="/game/anim1" class="expandable-card start-screen card3">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main2.png" alt="">
      </div>

      <div class="card-title">Kā izaug zivis?</div>
      <div class="card-subtitle">Ieskaties un pēti zivju vairošanos un attīstību</div>
    </router-link>

    <router-link to="/game/anim2" class="expandable-card start-screen card4">
      <div class="globe-border info"></div>

      <div class="card-image">
        <img src="@images/Main3.png" alt="">
      </div>

      <div class="card-title">Kā riesto stagari?</div>
      <div class="card-subtitle">Uzzini romantisko stagara vairošanās stāstu</div>
    </router-link>


    <router-view/>
  </div>
  <div v-if="isLoading" class="content-1080p detail-list detail-list-loading">
    Loading
  </div>
  <div v-if="errorMessage" class="content-1080p detail-list-error">
    <span>Error while fetching data from the server.</span>
    <span><strong>With message:</strong> {{ errorMessage }}</span>
  </div>
</template>