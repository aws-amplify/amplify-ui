import { Amplify } from 'aws-amplify';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.scss';

// This only exists to expose `Amplify` & its categories on `window` for e2e testing
if (typeof window !== 'undefined') {
  window['Amplify'] = Amplify;
}

createApp(App).use(router).mount('#app');
