<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import WaterLevel from "@src/components/educational1/WaterLevel.vue";
import InputHandlerService from "@src/services/InputHandlerService";
import InfoItemsListComposable from "@src/composables/InfoItemsList";
import DetailList from "@src/composables/DetailList";
import DetailListItem from "@src/structures/DetailListItem";
import InfoItem from "@src/components/InfoItem.vue";

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
    let item = findItemByIdentifier("3");
    item ? species.value.push(item) : null;

    item = findItemByIdentifier("22");
    item ? species.value.push(item) : null;

    item = findItemByIdentifier("5");
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

    const input = new InputHandlerService(document.querySelector('.edu1-page2-species-block'));
    input.onSelectItem(selectItemLocal);
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

        <div class="mb40">
            <div class="card numeric-row">
                <div class="number">240</div>
                <div class="text">Zivju sugas Baltijas jūrā kopumā</div>
            </div>

            <div class="numeric-row-half">
                <div class="line-l"></div>
                <div class="line-r"></div>
            </div>

            <div class="numeric-row-half">
                <div class="card numeric-row">
                    <div class="number">152</div>
                    <div class="text">Attiecināmas uz Baltijas jūru</div>
                </div>

                <div class="card numeric-row">
                    <div class="number">88</div>
                    <div class="text">Uz pārējiem ūdeņiem ar Ziemeļjūru</div>
                </div>
            </div>

            <div class="numeric-row-half">
                <div class="line-l"></div>
            </div>

            <div class="numeric-row-half">
                <div class="card numeric-row">
                    <div class="number">32</div>
                    <div class="text">Latvijas ūdeņos sastopamās sugas</div>
                </div>
            </div>
        </div>

        <div class="note">Baltijas jūrā konstatētās zivju sugas</div>
    </div>

    <div class="content-1080p edu1-page2-species-block">
        <InfoItem
            v-for="item in species"
            class="edu1-page2-species"
            :item="item"
            :is-selected="isItemSelected(item)"
            :is-map-visible="false"
            :card-width="308"
            :card-height="240"
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