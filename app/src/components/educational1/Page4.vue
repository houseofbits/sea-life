<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";
import InfoItem from "@src/components/InfoItem.vue";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailListItem from "@src/structures/DetailListItem";
import InputHandlerService from "@src/services/InputHandlerService";
import DetailList from "@src/composables/DetailList";

const emit = defineEmits(['prev', 'next', 'restart', 'show-detail']);
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const active1 = ref(false);
const species = ref<DetailListItem[]>([]);

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

const isSpeciesSelected = computed(() => {
    return !!selectedItemId.value;
});

function initContent(): void {
    let item = findItemByIdentifier("12");
    item ? species.value.push(item) : null;

    item = findItemByIdentifier("21");
    item ? species.value.push(item) : null;
}

watch(() => detailContent.value, (value) => {
    initContent();
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

function selectItemLocal(itemId: number): void {
    selectItem(itemId);
    const selectedItem = species.value.find((item: DetailListItem) => item.id == itemId);
    if (selectedItem) {
        emit('show-detail', true, selectedItem);
    }
}

function closeItemLocal(): void {
    closeItem();
    emit('show-detail', false, null);
}

onMounted(() => {
    initContent();

    const input = new InputHandlerService(document.querySelector('.edu1-page4-species-block'));
    input.onSelectItem(selectItemLocal);
});

</script>
<template>

    <div class="edu1-information-block page4-position">
        <div class="small-header">Invazīvās sugas Baltijas jūrā</div>

        <div class="text-block mb40">Par invazīvām sauc tādas sugas, kuras nonākušas un dzīvo ārpus to dabiskā
            izplatības
            areāla. Tās mēdz agresīvi izplatīties, strauji vairoties, līdz ar to nomākt vietējās sugas un apdraudēt
            vietējās ekosistēmas.
        </div>

        <div class="text-block"><strong>Invazīvās sugas ir pieaugoša problēma</strong>, jo šīs sugas konkurē ar vietējām
            par barības
            resursiem, dzīves vidi, kā arī pārnēsā dažādas slimības. Invazīvās sugas var būt starpnieki dažādiem cilvēku
            parazītorganismiem, toksīniem un jaunām infekcijas slimībām, pret kurām vietējām populācijām nav imunitātes.
            <strong>Baltijas jūrā ir konstatētas 105 invazīvās sugas</strong>, kuru ekoloģija un ietekme uz vietējām
            populācijām tiek
            pētīta.
        </div>

        <div class="cards-block">
            <div class="card">
                <div class="title">Pārvietošanās dabiskā veidā</div>

                <WaterLevel :is-active="active1" :wave-x="-160" :wave-y="20" :wave-scale="1.0"/>

                <div class="sub-title">migrācija, adaptācija, kolonizācija</div>
            </div>
            <div class="card">
                <div class="title">Cilvēka darbības rezultātā</div>

                <WaterLevel :is-active="active1" :wave-x="-180" :wave-y="10" :wave-scale="1.2">
                    <svg width="50" height="50" viewBox="0 0 26 27" fill="none" class="sailboat" :class="{active: active1}">
                        <path opacity="0.6"
                              d="M0.582492 20.447L5.04433 2.30919L10.5404 16.6237L0.582492 20.447ZM4.38778 16.1295L7.09508 15.09L5.60158 11.2002L4.38778 16.1295ZM12.4075 15.9068C12.4334 15.2303 12.3128 14.1102 12.0457 12.5465C11.7785 10.9828 11.3582 9.45414 10.7847 7.96045C10.2112 6.46677 9.48196 4.98528 8.59695 3.51598C7.7111 2.047 6.98996 0.990869 6.43351 0.347575C7.84237 0.235112 9.36972 0.446119 11.0155 0.980594C12.6605 1.51539 14.2571 2.2949 15.8054 3.31912C17.3528 4.34367 18.7677 5.57998 20.0502 7.02806C21.3315 8.47563 22.3107 10.0811 22.9878 11.8445L12.4075 15.9068ZM14.688 12.1747L19.2935 10.4064C18.3275 8.94443 17.1905 7.70282 15.8824 6.6816C14.5735 5.66071 13.2938 4.85474 12.0433 4.26369C12.2521 4.68342 12.4617 5.12041 12.6723 5.57467C12.8824 6.03007 13.083 6.50672 13.2742 7.00461C13.6486 7.97966 13.9482 8.90009 14.173 9.76592C14.3987 10.6314 14.5703 11.4344 14.688 12.1747ZM10.6795 24.4256C9.93263 24.7123 9.16994 24.8028 8.39142 24.6971L6.76717 25.5349L5.94488 25.8507C5.21295 26.1317 5.30331 26.097 4.7289 26.3175C3.7957 26.0569 2.92176 25.6246 2.10709 25.0204C1.2919 24.4175 0.607748 23.6747 0.054633 22.792L24.9494 13.2337C25.1291 14.2597 25.1183 15.2693 24.9169 16.2626C24.715 17.257 24.3546 18.1633 23.8356 18.9815C23.357 18.9748 22.8949 18.9023 22.4495 18.7639C22.0032 18.6258 21.7999 19.5121 21.39 19.3125C21.12 20.0351 20.5117 19.6388 20.0148 20.2343C19.517 20.83 18.8947 21.2713 18.1479 21.5581C17.4011 21.8448 16.6384 21.9353 15.8598 21.8296C15.0813 21.7238 14.5739 22.4081 13.9104 22.0439C13.6611 22.7585 13.069 22.4964 12.5613 23.096C12.0536 23.6956 11.4263 24.1388 10.6795 24.4256Z"
                              fill="#729DB7"/>
                    </svg>
                </WaterLevel>

                <div class="sub-title">apzināta introdukcija, transportēšana</div>
            </div>
        </div>

        <div class="note">Invazīvo sugu pārvietošanās no savas dabiskās teritorijas uz jaunu vietu veidi</div>
    </div>

    <div class="content-1080p edu1-page4-species-block">
        <InfoItem
            v-for="item in species"
            class="edu1-page4-species"
            :item="item"
            :is-selected="isItemSelected(item)"
            :is-map-visible="false"
            @close="closeItemLocal"
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