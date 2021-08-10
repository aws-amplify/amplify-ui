import { AuthInterpreter } from '@aws-amplify/ui-core';
import { createContext } from 'react';

export const AuthenticatorContext = createContext<AuthInterpreter>(null);
