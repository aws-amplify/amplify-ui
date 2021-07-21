import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Logger } from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

Logger.LOG_LEVEL = 'DEBUG';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
