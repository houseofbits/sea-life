<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import {useRouter} from "vue-router";
import {ref, onMounted, computed} from "vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";
import Card1 from "@src/components/educational2/Card1.vue";
import Card2 from "@src/components/educational2/Card2.vue";
import Card3 from "@src/components/educational2/Card3.vue";
import Card4 from "@src/components/educational2/Card4.vue";

const isViewActive = ref(false);

const router = useRouter();
const isCard1Active = ref<boolean>(false);
const isCard2Active = ref<boolean>(false);
const isCard3Active = ref<boolean>(false);
const isCard4Active = ref<boolean>(false);

const callout1Config = new CalloutConfigStructure({
    size: new Vector2(362,220),
    position: new Vector2(205,208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

const isCardActive = computed(() => {
    return isCard1Active.value || isCard2Active.value || isCard3Active.value || isCard4Active.value;
});

function back(): void {
    router.push('/');
}

function navigateToInfo(): void {
    router.push('/info');
}

onMounted(() => {
   setTimeout(() => {
       isViewActive.value = true;
   }, 200);
});

</script>
<template>
    <div class="content-1080p bg-white anim2-container">
        <navigation-bar>
            <span>Barības ķēdes Baltijas jūrā</span>
        </navigation-bar>

        <svg class="edu2-background" :class="{'view-active': isViewActive}" width="1920" height="553" viewBox="0 0 1920 553" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M623.526 159.637C482.945 -105.237 149.267 20.4174 0 116.354L0 837H1920V218.661C1854.1 175.378 1656.31 94.3189 1392.32 116.354C1062.34 143.897 799.251 490.73 623.526 159.637Z" fill="#D4E1E9" stroke="#D4E1E9"/>
        </svg>

        <div class="modal-background-overlay" :class="{active: isCardActive}"/>

        <div class="edu2-title">
            <div>Ar ko Baltijas jūra ir īpaša?</div>
            <div>Zivis un pārējie jūras ekosistēmas organismi barības ķēdēs ir cieši saistīti, tai skaitā arī cilvēks.</div>
        </div>

        <Card1 :is-active="isCard1Active" :is-view-active="isViewActive" @click="isCard1Active = !isCard1Active"/>
        <Card2 :is-active="isCard2Active" :is-view-active="isViewActive" @click="isCard2Active = !isCard2Active"/>
        <Card3 :is-active="isCard3Active" :is-view-active="isViewActive" @click="isCard3Active = !isCard3Active"/>
        <Card4 :is-active="isCard4Active" :is-view-active="isViewActive" @click="isCard4Active = !isCard4Active"/>

        <div @click="navigateToInfo" class="white-link">Jūras iemītnieku detalizēti apraksti</div>

<!--        <div class="back-filter" @click="navigateToMain">-->
<!--            <img src="@images/arrow-left.svg" alt="">-->
<!--            <span>Izvēlne</span>-->
<!--        </div>-->
    </div>
</template>
