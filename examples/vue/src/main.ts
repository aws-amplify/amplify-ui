import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import AmplifyUIVue from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

// Create app and register plugins
const app = createApp(App);
app.use(router);
app.use(AmplifyUIVue);
app.mount('#app');
