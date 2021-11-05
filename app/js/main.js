import "@style/main.css";
import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import MainApp from "@js/MainApp.vue";
import IndexView from '@js/Views/IndexView.vue';
import InfoView from "@js/Views/InfoView.vue";
import GameView from "@js/Views/GameView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: IndexView,
    },
    {
        path: "/info",
        name: "InfoView",
        component: InfoView,
    },
    {
        path: "/game",
        name: "GameView",
        component: GameView,
    },
];

const router = createRouter({
    mode: 'history',
    base: "/",
    history: createWebHistory(),
    routes,
});

const app = createApp(MainApp);

app.use(router);

app.mount('#gui');