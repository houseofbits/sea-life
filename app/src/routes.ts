import NavigationView from "@src/views/NavigationView.vue";
import InfoView from "@src/views/InfoView.vue";
import PuzzleView from "@src/views/PuzzleView.vue";
import Animation1View from "@src/views/Animation1View.vue";
import Animation2View from "@src/views/Animation2View.vue";
import Educational1View from "@src/views/Educational1View.vue";
import Educational2View from "@src/views/Educational2View.vue";

export default [
    {
        path: "/",
        name: "Home",
        component: NavigationView,
    },
    {
        path: "/info",
        name: "InfoView",
        component: InfoView,
    },
    {
        path: "/puzzle",
        name: "PuzzleView",
        component: PuzzleView,
    },
    {
        path: "/animation1",
        name: "Animation1View",
        component: Animation1View,
    },
    {
        path: "/animation2",
        name: "Animation2View",
        component: Animation2View,
    },
    {
        path: "/edu1",
        name: "Educational1View",
        component: Educational1View,
    },
    {
        path: "/edu2",
        name: "Educational2View",
        component: Educational2View,
    },
];