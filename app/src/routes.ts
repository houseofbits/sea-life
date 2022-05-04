import IndexView from "@src/views/IndexView.vue";
import InfoView from "@src/views/InfoView.vue";
import GameView from "@src/views/GameView.vue";
import PuzzleView from "@src/views/PuzzleView.vue";
import Animation1View from "@src/views/Animation1View.vue";
import Animation2View from "@src/views/Animation2View.vue";

export default [
    {
        path: "/",
        name: "Home",
        component: GameView,
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