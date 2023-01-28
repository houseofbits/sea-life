<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['prev', 'next', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);

watch(() => props.isActive, (value: boolean) => {
    if (value) {
        setTimeout(() => active1.value = true, 500);
    } else {
        active1.value = false;
    }
});

function prevPage(): void {
    emit('prev');
}

</script>
<template>

    <div class="edu1-information-block page6">
        <div class="small-header">Aizsargājamie biotopi Baltijas jūrā</div>

        <div class="text-block">Latvijas piekrastē Baltijas jūrā sastopami divi Eiropas Savienības nozīmes aizsargājamie
            biotopi <strong>1110 Smilšu sēkļi jūrā</strong> un <strong>1170 Akmeņu sēkļi jūrā</strong>.
        </div>

        <div class="box-wrapper">
            <div class="box">
                <img class="image" alt="" src=""/>

                <div class="title">Biotops 1110</div>

                <div class="text">Smilšu sēkļi jūrā ir garenas, apaļas vai neregulāras formas reljefa veidojumi, kurus
                    pastāvīgi klāj jūras ūdens. Šo biotopu veido galvenokārt smiltis ar grants, oļu, akmeņu un dūņu
                    piejaukumu, kurus apdzīvo baktēriju, daudzsartārpu, gliemju un vēžveidīgo sabiedrības. Smilšu sēkļi
                    ir nozīmīga zivju nārsta un barošanās vieta, tāpat tie piesaista arī ziemojošos ūdensputnus.
                </div>
            </div>

            <div class="box">
                <img class="image" alt="" src=""/>

                <div class="title">Biotops 1170</div>

                <div class="text">Akmeņu sēkļi jūrā ir viens no ievērojamākajiem un ekoloģiski nozīmīgākajiem biotopu
                    veidiem Baltijas jūras austrumu daļā, kas ir cieta substrāta teritorijas (akmeņi, laukakmeņi, oļi)
                    ar smilšu apbērumiem. Šo biotopa veidu apdzīvo neskaitāmas bezmugurkaulnieku, zivju, putnu un augu
                    sugas.
                </div>
            </div>
        </div>
    </div>


    <div class="page-navigation-link horizontal right" @click="emit('next')">
        <span>Turpināt</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>Atpakaļ</span>
    </div>

</template>