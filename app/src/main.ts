import "@style/main.css";
import "@style/detail-view.scss";
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