import { BasicAuthenticatorComponent } from '../pages/basic-authenticator/basic-authenticator.component';
import { CompositionAuthenticatorComponent } from '../pages/composition-authenticator/composition-authenticator.component';
import { CustomComponentAuthenticatorComponent } from '../pages/custom-component-authenticator/custom-component-authenticator.component';
import { CustomFormAuthenticatorComponent } from '../pages/custom-form-authenticator/custom-form-authenticator.component';
import { HeadlessAuthenticatorComponent } from '../pages/headless-authenticator/headless-authenticator.component';
import { StyledAuthenticatorComponent } from '../pages/styled-authenticator/styled-authenticator.component';
import { DocRoutes } from './types';

export const docRoutes: DocRoutes = [
  {
    path: 'basic-authenticator',
    name: 'Basic Authenticator',
    component: BasicAuthenticatorComponent,
  },
  {
    path: 'styled-authenticator',
    name: 'Styling Components',
    component: StyledAuthenticatorComponent,
  },
  {
    path: 'headless-authenticator',
    name: 'Headless Authenticator',
    component: HeadlessAuthenticatorComponent,
  },
  {
    path: 'custom-authenticator',
    name: 'Inserting Custom Components',
    component: CustomComponentAuthenticatorComponent,
  },
  {
    path: 'custom-form',
    name: 'Customizing Form',
    component: CustomFormAuthenticatorComponent,
  },
  // {
  //   path: 'composition',
  //   name: 'Composing components',
  //   component: CompositionAuthenticatorComponent,
  // },
];
