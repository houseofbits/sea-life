import "@style/font.css";
import "@style/editor-main.css";
import "@style/editor.scss";
import {createApp} from 'vue';
import EditorView from "@src/views/EditorView.vue";

createApp(EditorView)
    .mount('#gui');