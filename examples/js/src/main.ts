import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-standalone';

import './style.css';

Amplify.configure({});

const container = document.querySelector<HTMLDivElement>('#app')!;

new Authenticator(container);
