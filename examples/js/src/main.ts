import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-standalone';
import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
import '@aws-amplify/ui-standalone/styles.css';

Amplify.configure(awsExports);

const container = document.querySelector<HTMLDivElement>('#app')!;

new Authenticator({ container });
