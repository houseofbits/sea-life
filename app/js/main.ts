import "@style/main.css";
import {createApp} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import MainApp from "@js/MainApp.vue";
import IndexView from '@js/views/IndexView.vue';
import InfoView from "@js/views/InfoView.vue";
import GameView from "@js/views/GameView.vue";
import PuzzleView from "@js/views/PuzzleView.vue";
import Animation1View from "@js/views/Animation1View.vue";
import Animation2View from "@js/views/Animation2View.vue";

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
        children: [
            {
                path: "puzzle",
                name: "PuzzleView",
                component: PuzzleView,
            },
            {
                path: "anim1",
                name: "Animation1View",
                component: Animation1View,
            },
            {
                path: "anim2",
                name: "Animation2View",
                component: Animation2View,
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(MainApp);

app.use(router);

app.mount('#gui');