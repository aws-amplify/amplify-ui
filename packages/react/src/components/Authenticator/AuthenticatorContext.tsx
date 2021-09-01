import { AuthInterpreter } from '@aws-amplify/ui';
import { createContext } from 'react';

export const AuthenticatorContext = createContext<AuthInterpreter>(null);
