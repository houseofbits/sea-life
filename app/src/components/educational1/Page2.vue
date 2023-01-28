<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";
import InputHandlerService from "@src/services/InputHandlerService";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailList from "@src/composables/DetailList";
import DetailListItem from "@src/structures/DetailListItem";
import InfoItem from "@src/components/InfoItem.vue";

const emit = defineEmits(['prev', 'next', 'restart']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);

const {
    isItemSelected,
    selectItem,
    closeItem,
    selectedItemId
} = InfoItemsListComposable();

const {
    findItemByIdentifier,
    detailContent
} = DetailList();

const specie1 = ref<DetailListItem | null>(null);
const specie2 = ref<DetailListItem | null>(null);
const specie3 = ref<DetailListItem | null>(null);

const isSpeciesSelected = computed(() => {
    return !!selectedItemId.value;
});

watch(() => detailContent.value, (value) => {
    specie1.value = findItemByIdentifier("3");
    specie2.value = findItemByIdentifier("22");
    specie3.value = findItemByIdentifier("5");
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

onMounted(() => {
    specie1.value = findItemByIdentifier("3");
    specie2.value = findItemByIdentifier("22");
    specie3.value = findItemByIdentifier("5");

    const input = new InputHandlerService(document.querySelector('.edu1-page2-species-block'));
    input.onSelectItem(selectItem);
});

</script>
<template>

    <div class="edu1-information-block page2-position">
        <div class="small-header">Zivju daudzveidība Baltijas jūrā</div>

        <div class="text-block">Latvijas jūras ūdeņiem mūsdienās ir raksturīgas aptuveni <strong>35 zivju sugas</strong>, no kurām <strong>7
            pieder pie ceļotājzivīm</strong>. Baltijas jūras centrālajā daļā galvenokārt dominē brētliņas un reņģes, mazākā
            skaitā arī mencas, savukārt piekrastē sugu daudzveidība ir augstāka. Upju grīvu rajonos sugu skaits ir
            visaugstākais, jo šeit vienlaicīgi satiekas jūras, saldūdens un ceļotājzivis. Rīgas līča piekrastē ūdens
            sāļums ir tik neliels, ka te ir sastopamas praktiski visas mūsu saldūdens zivju sugas.
        </div>

        <div class="cards-block">
            <div class="card">
                <div class="title">Baltijas jūrā kopumā</div>

                <WaterLevel :is-active="active1" :wave-x="-350" :wave-y="10" :wave-scale="2.0">240</WaterLevel>
            </div>
            <div class="card">
                <div class="title">Attiecināms uz Baltijas jūru</div>

                <WaterLevel :is-active="active1" :wave-x="-240" :wave-y="50" :wave-scale="2.0">152</WaterLevel>
            </div>
            <div class="card">
                <div class="title">Uz pārejas ūdeņiem ar Ziemeļjūru</div>

                <WaterLevel :is-active="active1" :wave-x="-270" :wave-y="20" :wave-scale="2.0">88</WaterLevel>
            </div>
        </div>

        <div class="note">Baltijas jūrā konstatētās zivju sugas</div>
    </div>

    <div class="content-1080p edu1-page2-species-block">
        <InfoItem
            class="edu1-page2-species"
            v-if="specie1"
            :item="specie1"
            :is-selected="isItemSelected(specie1)"
            :is-map-visible="false"
            :card-width="308"
            :card-height="240"
            @close="closeItem"
        />

        <InfoItem
            class="edu1-page2-species"
            v-if="specie2"
            :item="specie2"
            :is-selected="isItemSelected(specie2)"
            :is-map-visible="false"
            :card-width="308"
            :card-height="240"
            @close="closeItem"
        />

        <InfoItem
            class="edu1-page2-species"
            v-if="specie3"
            :item="specie3"
            :is-selected="isItemSelected(specie3)"
            :is-map-visible="false"
            :card-width="308"
            :card-height="240"
            @close="closeItem"
        />
    </div>

    <div v-if="!isSpeciesSelected" class="page-navigation-link horizontal right" @click="emit('next')">
        <span>Turpināt</span>
        <img src="@images/chevron-right.svg" class="bounce-right-anim" alt="">
    </div>

    <div v-if="!isSpeciesSelected" class="page-navigation-link horizontal left" @click="prevPage">
        <img src="@images/chevron-left.svg" alt="">
        <span>Atpakaļ</span>
    </div>

</template>