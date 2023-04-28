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
    <div class="edu2-card card3" :class="{active: isActive, 'view-active': isViewActive}" @click="close">
        <div class="card-thumbnail">
            <div class="icon">
                <img src="@images/edu2-icon3.png" alt="Icon">
            </div>

            <div>
                <target-callout :hidden="isActive || !isViewActive" :config="callout1Config">
                    <div class="callout-header-text">Jūras zīdītāji</div>
                </target-callout>
            </div>
        </div>

        <div class="card-content">
            <div class="header">
                <span>Jūras zīdītāji</span>
                <img class="close" src="@images/cross.svg" alt="">
            </div>

            <svg class="background" width="1600" height="323" viewBox="0 0 1600 323" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1449.04 3.30096C989.301 -20.7131 1030.94 89.8516 726.593 219.427C495.128 317.975 159.821 277.831 -0.5 241.105V321L1599.5 325.5V19.3791C1550.33 11.5357 1500.02 5.96409 1449.04 3.30096Z" fill="#D4E1E9"/>
            </svg>

            <div class="text-frame">
                <div>No zīdītājiem jūras ūdeņos sastopams <strong>pelēkais ronis</strong>, retāk – <strong>pogainais ronis</strong>. Atsevišķos gadījumos novēroti <strong>cūkdelfīni</strong> un <strong>plankumainais ronis</strong>. Pateicoties labvēlīgiem barošanās apstākļiem, pelēko roņu populācija ir labā stāvoklī.</div>

                <div class="box">
                    <div class="circle">
                        <svg width="64" height="46" viewBox="0 0 64 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.1542 11.4555C20.4698 -5.66762 -2.51698 2.45546 -12.7998 8.6574V55.2446H119.467V15.2712C114.927 12.4731 101.302 7.23293 83.1159 8.6574C60.3836 10.438 42.2597 32.8595 30.1542 11.4555Z" fill="#D4E1E9" stroke="#D4E1E9"/>
                        </svg>
                    </div>

                    <div class="text">Ļoti reti Baltijas jūrā var novērot vaļus. Piemēram, 1976. gadā pie Kauguriem bija izskalots finvalis, bet 2006. gadā netālu no Duntes konstatēts miris kuprvalis.</div>
                </div>

                <div>Pašā apakšā apskatāmi roņi.</div>
            </div>

            <div class="image-frame">
                <img src="@images/edu2-image3.png" alt=""/>
            </div>
        </div>
    </div>
</template>