<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
</script>
<template>
    <div class="content-1080p bg-white">

        <navigation-bar :is-home-button-visible="false">
            <span>Baltijas jūra un tās iemītnieki</span>
        </navigation-bar>

        <img class="anim1-info-bg1" src="@images/anim1-info-bg1.svg" alt="">

        <div class="start-screen-cards">
            <router-link to="/info" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-info.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Baltijas jūras iemītnieki</div>
                    <div class="subtitle">Izpēti vitrīnās izvietoto sugu aprakstus</div>
                </div>
            </router-link>

            <router-link to="/puzzle" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-puzzle.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Kā veidota menca?</div>
                    <div class="subtitle">Saliec mencu</div>
                </div>
            </router-link>

            <router-link to="/animation1" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-anim1.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Kā izaug zivis?</div>
                    <div class="subtitle">Ieskaties un pēti zivju vairošanos un attīstību</div>
                </div>
            </router-link>

            <router-link to="/animation2" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-anim2.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Kā riesto stagari?</div>
                    <div class="subtitle">Uzzini romantisko stagara vairošanās stāstu</div>
                </div>
            </router-link>

            <router-link to="/edu1" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-edu1.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Baltijas jūra</div>
                    <div class="subtitle">Ar ko Baltijas jūra ir īpaša?</div>
                </div>
            </router-link>

            <router-link to="/edu2" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-edu2.png" alt="">
                </div>
                <div class="text">
                    <div class="title">Barības ķēdes Baltijas jūrā</div>
                    <div class="subtitle">Organismi Baltijas jūreas ekosistēmā</div>
                </div>
            </router-link>
        </div>
    </div>
</template>