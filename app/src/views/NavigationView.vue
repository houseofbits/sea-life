<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
</script>
<template>
    <div class="content-1080p bg-white">

        <navigation-bar>
            <span>Baltijas jūra un tās iemītnieki</span>
        </navigation-bar>

        <img class="anim1-info-bg1" src="@images/anim1-info-bg1.svg" alt="">

        <router-link to="/info" class="expandable-card start-screen card1">
            <div class="globe-border info"></div>

            <div class="card-image">
                <img src="@images/Main4.png" alt="">
            </div>

            <div class="card-title">Baltijas jūras iemītnieki</div>
            <div class="card-subtitle">Izpēti vitrīnās izvietoto sugu aprakstus</div>
        </router-link>

        <router-link to="/puzzle" class="expandable-card start-screen card2">
            <div class="globe-border info"></div>

            <div class="card-image">
                <img src="@images/Main1.png" alt="">
            </div>

            <div class="card-title">Kā veidota menca?</div>
            <div class="card-subtitle">Saliec mencu</div>
        </router-link>

        <router-link to="/animation1" class="expandable-card start-screen card3">
            <div class="globe-border info"></div>

            <div class="card-image">
                <img src="@images/Main2.png" alt="">
            </div>

            <div class="card-title">Kā izaug zivis?</div>
            <div class="card-subtitle">Ieskaties un pēti zivju vairošanos un attīstību</div>
        </router-link>

        <router-link to="/animation2" class="expandable-card start-screen card4">
            <div class="globe-border info"></div>

            <div class="card-image">
                <img src="@images/Main3.png" alt="">
            </div>

            <div class="card-title">Kā riesto stagari?</div>
            <div class="card-subtitle">Uzzini romantisko stagara vairošanās stāstu</div>
        </router-link>
    </div>
</template>