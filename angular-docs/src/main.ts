import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Logger } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id:
    'us-east-1:0dfa6579-b9af-4781-9f2e-b161f7a26307',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_4FNbpwFqO',
  aws_user_pools_web_client_id: '2dfpjl44p117jl8kjpo7fv4rir',
  oauth: {}
});

Logger.LOG_LEVEL = 'DEBUG';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
