<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";

const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);
const isMapOpen = ref(false);

onMounted(() => {
    setTimeout(() => active1.value = true, 500);
});

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
        isMapOpen.value = false;
    } else {
        active1.value = false;
    }
});


</script>
<template>

    <div class="edu1-information-block">
        <div class="small-header">Ar ko Baltijas jūra ir īpaša?</div>

        <div class="text-block">Baltijas jūra ir <strong>iesāļūdens jūra</strong>. Tajā spēj izdzīvot tikai tās zivju sugas, kas spēj
            pielāgoties mainīgajiem vides apstākļiem – samazinātajam sāļumam un krasajām temperatūras sezonālajām
            svārstībām. Savdabīgie vides apstākļi ietekmē zivju augšanu. Daudzas jūras zivju sugas Baltijas jūrā
            nesasniedz tik lielu ķermeņa izmēru, kā citās jūrās un okeānos. Savukārt atsevišķām saldūdens zivju sugām,
            piemēram līdakām un asariem, Baltijas jūras iesāļais ūdens un bagātīgā barības bāze dažos jūras rajonos ļauj
            sasniegt ievērojamus ķermeņa izmērus.
        </div>

        <div class="cards-block">
            <div class="card">
                <div class="title">Pasaules jūras un okeāni</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-40" :wave-y="20" fill="#e2a3a0">
                        30-35
                    </WaterLevel>
                    <div class="units-sign">‰</div>
                </div>
            </div>
            <div class="card">
                <div class="title">Baltijas jūrā pie Latvijas</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-70" :wave-y="40" fill="#ffe9bf">
                        7-12
                    </WaterLevel>
                    <div class="units-sign">‰</div>
                </div>
            </div>
            <div class="card">
                <div class="title">Rīgas jūras līcī</div>

                <div class="water-level-wrapper">
                    <WaterLevel :is-active="active1" :wave-x="-300" :wave-y="50">
                        3-7
                    </WaterLevel>
                    <div class="units-sign">‰</div>
                </div>
            </div>
        </div>

        <div class="note">Apskatāms aptuvens jūru sāļums. Mērvienība: miligrami uz litru</div>
    </div>

    <div class="modal-background-overlay" :class="{active:isMapOpen}"></div>
    <div class="edu1-expandable-circle page1" :class="{active:isMapOpen}" @click="isMapOpen=!isMapOpen">
        <div class="status-bar">
            <span>Baltijas jūras sāļums</span>
            <img class="close" src="@images/cross.svg" alt="">
        </div>
        <img class="content" alt="" src="@images/edu1-map1.png"/>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>Turpināt</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

</template>