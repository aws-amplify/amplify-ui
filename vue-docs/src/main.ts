import { createApp } from 'vue';
import App from './App.vue';
import VueMarkdownIt from 'vue3-markdown-it';
import './css/tailwind.css';
import 'prismjs/themes/prism-okaidia.css';

const app = createApp(App);
app.use(VueMarkdownIt);
app.mount('#app');