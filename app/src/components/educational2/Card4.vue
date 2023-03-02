<script setup lang="ts">
import TargetCallout from "@src/components/puzzle/TargetCallout.vue";
import CalloutConfigStructure from "@src/structures/CalloutConfigStructure";
import Vector2 from "@src/structures/Vector2";
import {CalloutTypeEnum} from "@src/helpers/CalloutTypeEnum";

const emit = defineEmits(['close']);

const props = defineProps({
    isViewActive: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const callout1Config = new CalloutConfigStructure({
    size: new Vector2(362, 220),
    position: new Vector2(205, 208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

function close(): void {
    emit('close');
}

</script>
<template>
    <div class="edu2-card card4" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon4.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Dzīvie organismi uz jūras gultnes (bentoss)</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Dzīvie organismi uz jūras gultnes (bentoss)</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1090" height="662" viewBox="0 0 1090 662" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M984.691 71.33C702.844 305.181 641.541 716.6 317.537 601.692C204.783 561.703 95.4544 596.674 2 662.421L1089.5 662.421L1089.5 1.49998C1055.08 25.3791 1019.98 42.054 984.691 71.33Z"
                    fill="#D4E1E9" stroke="#D4E1E9"/>
            </svg>

            <div class="text-frame">
                <div><strong>Organismu kopu, kas apdzīvo ūdenstilpnes dibenu, sauc par bentosu.</strong> To veido augi
                    (fitobentoss) un
                    dzīvnieki (zoobentoss). Lielāka sugu daudzveidība raksturīga piekrastes zonu akmeņainām vietām, kas
                    piemērotas aļģu augšanai un ir nozīmīgas zivju nārsta vietas.
                </div>

                <div class="box">
                    <div>Uz jūras grunts sastopamie augi lielākoties ir makroskopiskās (ar aci saredzamās) aļģes, retāk
                        tie ir augstākie augi. <strong>Latvijas piekrastē augi parasti neaug dziļāk par 18 - 25
                            metriem.</strong> Dziļāk
                        tiem ir par tumšu – nepietiek gaismas fotosintēzes veikšanai.
                    </div>
                    <div class="sub-text">Zem sārtaļģu joslas augi vairs nav atrodami, taču ir sastopami dzīvnieki.
                    </div>
                    <div class="small-cards">
                        <div>
                            <svg width="200" height="57" viewBox="0 0 200 57" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M200.5 57H-0.50293V23.4374C10.0202 12.5396 32.7903 0.929738 76.2823 0.063795C143.932 -1.28313 164.601 19.1031 200.5 22.9796V57Z"
                                    fill="#D4E1E9"/>
                            </svg>
                            <span>Zaļaļģes</span>
                        </div>
                        <div>
                            <svg width="200" height="80" viewBox="0 0 200 80" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M163.392 28.2777C114.856 31.4111 99.5639 -1.80308 21.7739 0.0769701C13.4366 0.278467 5.86547 0.962119 -1 2.02877V79.5H200V23.8397C187.081 25.8908 174.728 27.5458 163.392 28.2777Z"
                                    fill="#D4E1E9"/>
                            </svg>
                            <span>Brūnaļģes</span>
                        </div>
                        <div>
                            <svg width="200" height="106" viewBox="0 0 200 106" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M154.896 2.05179C116.845 -5.37807 66.2772 28.5868 29.728 33.8938C17.7308 35.6359 8.43086 30.7447 -0.72168 23.5001V107H200.5V17.3828C186.539 11.0985 170.307 5.06088 154.896 2.05179Z"
                                    fill="#D4E1E9"/>
                            </svg>
                            <span>Sārtaļģes</span>
                        </div>
                    </div>
                    <div class="annotation">*Ilustrācijā redzamas dažādas dziļumu joslas kurās sastopamas aļģes</div>
                </div>

                <div><strong>Aļģes ir ekosistēmas primārie producenti.</strong> Tas nozīmē – aļģes no neorganiskajām
                    vielām rada
                    organiskās vielas, kuras tālāk jūras dzīvnieki var izmantot pārtikā. Tāpēc vietās, kur ir daudz
                    aļģu, pulcējas arī daudz to „ēdāju”.
                </div>
            </div>

            <div class="image-frame">
                <img alt="" src="@images/edu2-image4.png"/>

                <div>Aļģēs sastopamie dzīvnieki ir galvenokārt kukaiņu kāpuri, gliemji, sīkas zivis, vēžveidīgie. Šie
                    dzīvnieki var kļūt par barību lielākām zivīm un ūdens putniem, tādēļ vietās ar bagātīgu jūras dibena
                    veģetāciju parasti var sastapt arī daudz putnu.
                </div>
            </div>

        </div>
    </div>
</template>