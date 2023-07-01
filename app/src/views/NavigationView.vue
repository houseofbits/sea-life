<script setup lang="ts">
import NavigationBar from "@src/components/NavigationBar.vue";
import DetailTranslations from "@src/composables/DetailTranslations";

const {lang} = DetailTranslations();

</script>
<template>
    <div class="content-1080p bg-white">

        <navigation-bar :is-home-button-visible="false">
            <span>{{ lang('navi.sectionTitle') }}</span>
        </navigation-bar>

        <img class="anim1-info-bg1" src="@images/anim1-info-bg1.svg" alt="">

        <div class="start-screen-cards">
            <router-link to="/info" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-info.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card1.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card1.subtitle') }}</div>
                </div>
            </router-link>

            <router-link to="/puzzle" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-puzzle.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card2.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card2.subtitle') }}</div>
                </div>
            </router-link>

            <router-link to="/animation1" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-anim1.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card3.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card3.subtitle') }}</div>
                </div>
            </router-link>

            <router-link to="/animation2" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-anim2.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card4.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card4.subtitle') }}</div>
                </div>
            </router-link>

            <router-link to="/edu1" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-edu1.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card5.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card5.subtitle') }}</div>
                </div>
            </router-link>

            <router-link to="/edu2" class="card">
                <div class="card-image">
                    <img src="@images/main-icons-edu2.png" alt="" oncontextmenu="return false;">
                </div>
                <div class="text">
                    <div class="title">{{ lang('navi.card6.title') }}</div>
                    <div class="subtitle">{{ lang('navi.card6.subtitle') }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>