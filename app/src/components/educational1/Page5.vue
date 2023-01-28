<script setup lang="ts">
import {ref, watch} from "vue";

const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
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

    <div class="edu1-information-block page5-position">
        <div class="small-header">Kāda ir Baltijas jūras gultne?</div>

        <div class="text-block mb40">Baltijas jūras Rīgas līča ūdeņos gultne ir ļoti dažāda – smilšaina, dūņaina, akmeņaina,
            oļaina, ar jauktu sedimentu (nogulumu) sastāvu vai klāta ar granti, gliemežvākiem, dolomītiežiem vai
            smilšakmeni.
        </div>
        <div class="text-block">
            Tā var būt bez veģetācijas vai klāta ar ūdensaugiem – makroskopiskām aļģēm, retāk augstākiem augiem.
        </div>

        <div class="page5-waves-block">
            <div class="waves-graphic page5-height">
                <div class="static-wrapper">
                    <svg viewBox="0 0 620 130" :class="{active: active1}">
                        <path
                            style="fill:#D4E1E9;stroke:none;"
                            d="m 0.51927134,121.32766 c 0,0 10.37070066,6.7911 24.67260066,3.8127 12.8828,-2.68287 24.145196,0.9116 31.823481,-0.0169 15.410381,-1.86344 17.722784,-1.7075 22.666401,-0.75402 8.932843,1.72288 13.138312,0.53431 29.053446,0.16532 10.88722,-0.25242 13.18402,-1.86587 28.56948,-0.0453 17.85252,2.11248 30.75208,0.5824 43.73686,0.90321 12.11372,0.29928 13.51946,1.52514 26.47809,1.48555 7.58121,-0.0232 9.00944,-0.0739 20.9814,-0.3925 12.77087,-0.33985 21.13507,-1.14788 28.7664,-0.80918 12.22473,0.54256 20.02647,1.65855 35.93046,0.5325 13.93179,-0.98642 16.33511,-1.00292 53.0336,-1.01573 22.92221,-0.008 45.60651,-0.60811 67.11636,0.65387 15.46802,0.90751 25.10053,-0.094 41.58745,-0.5753 15.57211,-0.45456 23.37024,0.4 34.39126,-0.31485 11.20811,-0.727 18.34761,0.44963 33.9111,1.48925 9.23378,0.61681 24.81282,-1.20703 52.51303,-0.0695 24.44483,1.00383 44.40494,-2.63803 44.40494,-2.63803 l -0.10303,4.23127 -620.45070422,-0.54552 z"
                        />
                    </svg>
                    <div class="title">Kāpēc ir platības, kur nekas neaug?</div>
                    <div class="sub-title">Vai nu ūdens ir par dziļu, lai augi izdzīvotu, vai arī viļņi un jūras straumes visu laiku pārvieto smiltis, neļaujot nekam ieaugt.</div>
                </div>
            </div>
        </div>
    </div>

    <div class="edu1-page5-video">
        VIDEO NO DAPA ar jūras gultni, mizīdām utt.
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