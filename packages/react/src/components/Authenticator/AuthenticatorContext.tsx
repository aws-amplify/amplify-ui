import { AuthInterpreter } from '@aws-amplify/ui';
import * as React from 'react';

export const AuthenticatorContext = React.createContext<AuthInterpreter>(null);
