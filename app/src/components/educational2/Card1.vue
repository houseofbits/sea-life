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
    size: new Vector2(362,220),
    position: new Vector2(205,208),
    type: CalloutTypeEnum.BOTTOM_LEFT
});

function close(): void {
    emit('close');
}

</script>
<template>
    <div class="edu2-card card1" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon1.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Dzīvie organismi jūras ūdensklajā (pelagiālē)</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Dzīvie organismi jūras ūdensklajā (pelagiālē)</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1076" height="712" viewBox="0 0 1076 712" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.44813e-06 712L1076.5 711.999L1076.5 0.581651C571.828 11.4487 515.299 359.62 2.44813e-06 712Z" fill="#D4E1E9"/>
            </svg>

            <div class="text">Baltijas jūras un Rīgas jūras līča ūdens iemītnieku sugu sastāvs atkarīgs no dziļuma, ūdens temperatūras un sāļuma.</div>

            <div class="small-card first">
                <img alt="" src="@images/edu2-image1.png"/>
                <div>Fitoplanktons</div>
                <div>Organisko vielu ražotāji - mikroskopiskās aļģes</div>
            </div>

            <div class="small-card second">
                <img alt="" src="@images/edu2-image5.png"/>
                <div>Zooplanktons</div>
                <div>ūdenī pasīvi peldošie mikroskopiskie dzīvnieki</div>
            </div>

            <div class="bullet-points vertical-bullet-points">
                <div class="ball" :class="{active: true}">
                    <div/>
                </div>
                <div class="second active">
                    <div class="line" />
                    <div class="ball"><div /></div>
                </div>
                <div class="third active">
                    <div class="line" />
                    <div class="ball"><div /></div>
                </div>
                <div class="fourth active">
                    <div class="line" />
                    <div class="ball"><div /></div>
                </div>
                <div class="fifth active">
                    <div class="line" />
                    <div class="ball"><div /></div>
                </div>
            </div>

            <div class="bullet-texts">
                <div>Atklātajos ūdeņos galvenie primārie producenti (organisko vielu ražotāji) ir <strong>fitoplanktons</strong> – mikroskopiskās aļģes.</div>
                <div>No fitoplanktona pārtiek <strong>zooplanktons</strong> – ūdenī pasīvi peldošie mikroskopiskie dzīvnieki.</div>
                <div><strong>Zooplanktons</strong> savukārt ir pelagiāles <strong>zivju</strong> (brīvā ūdenī un nevis uz grunts dzīvojošo zivju) <strong>barība</strong>. </div>
                <div>No tām nozīmīgākās ir reņģes un siļķes. Tās savukārt kļūst par plēsēju – mencu, lašu un citu – pārtiku. Ar zivīm barojas arī jūras zīdītāji, piemēram, roņi un cūkdelfīni.</div>
                <div>Vienlaikus liels daudzums planktona iet bojā „dabiskā nāvē”, nogrimst jūras dibenā, kur <strong>kļūst par barību</strong> bentosam – sugām, kuras dzīvo pie paša jūras dibena.</div>
            </div>
        </div>
    </div>
</template>