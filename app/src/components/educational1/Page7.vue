<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";

const emit = defineEmits(['prev', 'next', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);

onMounted(() => {
    setTimeout(() => active1.value = true, 1000);
});

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

    <div class="edu1-information-block page7">
        <div class="small-header">Aizsargājamās teritorijas Baltijas jūrā</div>

        <div class="text-block">Aizsargājamās jūras teritorijas veidotas bentisko jeb jūras dibena biotopu un sugu
            saglabāšanai, kā arī migrējošām putnu sugām nozīmīgu barošanās un ziemošanas vietu aizsardzībai.
        </div>

        <div class="card">
            <div class="title">Latvijā aizsargājamās teritorijas</div>

            <div class="sub-title">Latvijā ir izveidotas vairākas jūras aizsargājamās teritorijas, un tās aizņem 32,5%
                no Latvijas teritoriālās jūras kopplatības.
            </div>

            <div class="water-level-wrapper">
                <WaterLevel :is-active="active1" :wave-x="-40" :wave-y="40">
                    32,5
                </WaterLevel>
                <div class="units-sign">‰</div>
            </div>

            <div class="note">Vislielākās aizsargājamās jūras teritorijas: Ainaži-Salacgrīva, Akmensrags, Irbes šaurums,
                Nida-Pērkone, Rīgas līča rietumu piekraste, Selga uz rietumiem no Tūjas, Vitrupe-Tūja.
            </div>
        </div>
    </div>

    <div class="edu1-page6-map">Karte ar aizsargājamām jūras teritorijām</div>

    <div class="edu1-page6-note">Projekta „REEF - Jūras aizsargājamo biotopu izpēte un nepieciešamā aizsardzības statusa
        noteikšana Latvijas ekskluzīvajā ekonomiskajā zonā” ietvaros tiek pētītas vēl trīs teritorijas, lai iekļautu tās
        aizsargājamo tīklā.
    </div>

    <div class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>Atpakaļ</span>
    </div>

    <div class="page-navigation-link horizontal right" @click="emit('restart', true)">
        <span>Beigas</span>
        <img src="@images/chevron-right.svg" alt="">
    </div>

</template>