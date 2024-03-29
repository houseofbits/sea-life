import "@style/font.css";
import "@style/main.css";
import "@style/slider.scss";
import "@style/detail-view.scss";
import "@style/puzzle.scss";
import "@style/animation1.scss";
import "@style/animation2.scss";
import "@style/educational1.scss";
import "@style/educational2.scss";
import {createApp} from 'vue';
import {createWebHistory, createRouter} from "vue-router";
import MainApp from "@src/MainApp.vue";
import routes from '@src/routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(MainApp)
    .use(router)
    .mount('#gui');